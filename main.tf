provider "aws" {
  region = var.aws_region
}

# S3 bucket for web
resource "aws_s3_bucket" "traveler_form_web" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "traveler_form_web_website_configuration" {
  bucket = aws_s3_bucket.traveler_form_web.id

  index_document {
    suffix = "index.html"
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_name}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "traveler_form_web_policy" {
  bucket = aws_s3_bucket.traveler_form_web.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

# CloudFront
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.traveler_form_web.bucket_regional_domain_name
    origin_id   = var.bucket_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for Traveler Form Web"
  default_root_object = "index.html"
  
  price_class = "PriceClass_100"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.bucket_name

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for Traveler Form Web"
}

# DynamoDB Table
resource "aws_dynamodb_table" "traveler_form" {
  name           = "traveler-form"
  hash_key       = "id"
  read_capacity  = 20
  write_capacity = 20
  
  attribute {
    name = "id"
    type = "N"
  }
}

# IAM role pour Lambda
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid = ""
      },
    ],
  })
}

# IAM policy pour permettre à Lambda d'écrire dans DynamoDB
resource "aws_iam_role_policy" "lambda" {
  name = "lambda"
  role = aws_iam_role.iam_for_lambda.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        Effect = "Allow",
        Resource = aws_dynamodb_table.traveler_form.arn
      }
    ]
  })
}

# Lambda functions
resource "aws_lambda_function" "traveler_form_create" {
  filename         = "packages/api/traveler-form/create/build/handler.zip"
  function_name    = "traveler-form-create"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  source_code_hash = filebase64sha256("packages/api/traveler-form/create/build/handler.zip")

  runtime = "nodejs18.x"

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.traveler_form.name
    }
  }
}

# API Gateway REST API
resource "aws_api_gateway_rest_api" "api" {
  name        = "traveler-form-api"
  description = "Traveler Form API"
}

# API Gateway resource
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "traveler-form"
}

# API Gateway method
resource "aws_api_gateway_method" "method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# API Gateway integration
resource "aws_api_gateway_integration" "integration" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.method.http_method
  
  type          = "AWS_PROXY"
  integration_http_method = "POST"
  uri           = aws_lambda_function.traveler_form_create.invoke_arn
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integration]
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"
}