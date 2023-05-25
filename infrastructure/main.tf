provider "aws" {
  region = var.AWS_REGION
}

# API
module "dynamodb" {
  source = "../packages/api/infrastructure/dynamodb"
}

module "api_gateway" {
  source = "../packages/api/infrastructure/api-gateway"

  name        = "traveler-form-api"
  description = "Traveler Form API"
  api_key     = var.API_KEY

  allowed_origins = ["https://bnbcompanion.com", "https://checkin.bnbcompanion.com", "http://localhost:3000"]
  
  dynamodb_tables = {
    traveler_form_arn = module.dynamodb.tables.traveler_form
  }
}

# WEB
module "web_cloudfront" {
  source = "../packages/web/infrastructure/cloudfront"
  
  bucket_name = var.WEB_BUCKET_NAME
  bucket_domain_name = module.web_s3_bucket.domain_name
}

module "web_s3_bucket" {
  source = "../packages/web/infrastructure/s3_bucket"
  
  oai_iam_arn = module.web_cloudfront.oai_iam_arn
  bucket_name = var.WEB_BUCKET_NAME
}