provider "aws" {
  region = var.AWS_REGION
}

terraform {
  backend "s3" {
    bucket = "traveler-form-terraform" 
    key    = "prod/terraform.tfstate"
    region = "eu-west-1"
  }
}

module "dynamodb" {
  source = "./dynamodb"

  env = var.env
}

module "api_gateway" {
  source = "./api-gateway"
  
  env             = var.env
  api_key         = var.API_KEY
  dynamodb_tables = {
    traveler_form_arn = module.dynamodb.tables.traveler_form_arn
  }

  certificate_arn = "arn:aws:acm:us-east-1:272649283154:certificate/1ccce314-9bb8-419b-a52c-98507fac8030"
  domain_name     = "api.bnbcompanion.com"
}

module "web_s3_bucket" {
  source = "../common/modules/s3_bucket"
  
  env         = var.env
  bucket_name = var.WEB_BUCKET_NAME
  oai_iam_arn = module.web_cloudfront.oai_iam_arn
}

module "web_cloudfront" {
  source = "../common/modules/cloudfront"
  
  env                 = var.env
  bucket_name         = module.web_s3_bucket.name
  bucket_domain_name  = module.web_s3_bucket.domain_name
  acm_certificate_arn = "arn:aws:acm:us-east-1:272649283154:certificate/1ccce314-9bb8-419b-a52c-98507fac8030"
  domain_name         = "bnbcompanion.com"
}
