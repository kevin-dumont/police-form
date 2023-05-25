

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
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = aws_api_gateway_method.method.http_method
  
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = module.traveler_form_create_lambda.lambda_function_arn
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integration]
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"
}


# APi gateway resources
module "traveler_form_create_lambda" {
  source          = "../packages/api/resources/traveler-form/create/infrastructure"
  dynamodb_table  = aws_dynamodb_table.traveler_form.arn
  api_gateway_arn = aws_api_gateway_rest_api.api.execution_arn
}

# For Api Key
resource "aws_api_gateway_usage_plan" "usage_plan" {
  name        = "MyUsagePlan"
  description = "My Usage Plan"
  
  api_stages {
    api_id = aws_api_gateway_rest_api.api.id
    stage  = aws_api_gateway_deployment.deployment.stage_name
  }
}

resource "aws_api_gateway_api_key" "api_key" {
  name        = "api_key"
  description = var.API_KEY
  enabled     = true
}

resource "aws_api_gateway_usage_plan_key" "api_key" {
  key_id        = aws_api_gateway_api_key.api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.usage_plan.id
}

# CORS management
module "cors_post" {
  source = "./modules/api-gateway/cors"
  
  rest_api_id     = aws_api_gateway_rest_api.api.id
  resource_id     = aws_api_gateway_resource.resource.id
  http_method     = "POST"
  allowed_origins = ["https://bnbcompanion.com", "https://checkin.bnbcompanion.com", "http://localhost:3000"]
}

module "cors_get" {
  source = "./modules/api-gateway/cors"
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = "GET"
  allowed_origins = ["https://bnbcompanion.com", "https://checkin.bnbcompanion.com", "http://localhost:3000"]
}

module "cors_delete" {
  source = "./modules/api-gateway/cors"
  
  rest_api_id     = aws_api_gateway_rest_api.api.id
  resource_id     = aws_api_gateway_resource.resource.id
  http_method     = "DELETE"
  allowed_origins = ["https://bnbcompanion.com", "https://checkin.bnbcompanion.com", "http://localhost:3000"]
}


module "cors_put" {
  source = "./modules/api-gateway/cors"
  
  rest_api_id     = aws_api_gateway_rest_api.api.id
  resource_id     = aws_api_gateway_resource.resource.id
  http_method     = "PUT"
  allowed_origins = ["https://bnbcompanion.com", "https://checkin.bnbcompanion.com", "http://localhost:3000"]
}
