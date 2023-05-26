provider "aws" {
  region = var.AWS_REGION
}


terraform {
  backend "s3" {
    bucket = "traveler-form-terraform"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# API
module "dynamodb" {
  source = "../packages/api/infrastructure/dynamodb"
}

module "api_gateway" {
  source = "../packages/api/infrastructure/api-gateway"

  name        = "traveler-form-api"
  description = "Traveler Form API"
  api_key     = var.API_KEY

  config = {
    aws_region = data.aws_region.current.name
    aws_account = data.aws_caller_identity.current.account_id
  }
    
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