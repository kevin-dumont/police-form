

# API Gateway REST API
resource "aws_api_gateway_rest_api" "api" {
  name        = var.name
  description = var.description
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [module.traveler_form_create_lambda.integration]
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"
}

## Usage plan for Api Key
resource "aws_api_gateway_usage_plan" "usage_plan" {
  name        = "UsagePlan"
  description = "Usage Plan to setup an api key"
  
  api_stages {
    api_id = aws_api_gateway_rest_api.api.id
    stage  = aws_api_gateway_deployment.deployment.stage_name
  }
}

resource "aws_api_gateway_api_key" "api_key" {
  name        = "api_key"
  description = var.api_key
  enabled     = true
}

resource "aws_api_gateway_usage_plan_key" "api_key" {
  key_id        = aws_api_gateway_api_key.api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.usage_plan.id
}