provider "aws" {
  region = var.aws_region
}

# S3 bucket for web
resource "aws_s3_bucket" "traveler_form_web" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "traveler_form_web" {
  bucket = aws_s3_bucket.traveler_form_web.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_acl" "traveler_form_web_acl" {
  bucket = aws_s3_bucket.traveler_form_web.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "traveler_form_web_policy" {
  bucket = aws_s3_bucket.traveler_form_web.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*"
        Action = "s3:GetObject",
        Resource = "arn:aws:s3:::${var.bucket_name}/*"
      },
    ],
  })
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