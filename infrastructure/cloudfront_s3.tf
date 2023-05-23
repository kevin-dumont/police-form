
# S3 bucket for web
resource "aws_s3_bucket" "traveler_form_web" {
  bucket = var.WEB_BUCKET_NAME
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
    resources = ["arn:aws:s3:::${var.WEB_BUCKET_NAME}/*"]

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
    origin_id   = var.WEB_BUCKET_NAME

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
    target_origin_id = var.WEB_BUCKET_NAME

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