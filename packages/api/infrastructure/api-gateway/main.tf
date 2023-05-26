

# API Gateway REST API
resource "aws_api_gateway_rest_api" "api" {
  name        = var.name
  description = var.description
  body        = local.template.swagger
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"

  # Forces a new deployment after API changes
  triggers = {
    redeployment = sha1(local.template.swagger)
  }
  
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_documentation_version" "documentation" {
  version     = "v1.0.0"
  rest_api_id = aws_api_gateway_rest_api.api.id
  description = "Inflow public API DOC, deploy at ${timestamp()}"

  lifecycle {
    create_before_destroy = true
  }
}

## Usage plan for Api Key
resource "aws_api_gateway_usage_plan" "usage_plan" {
  name        = "UsagePlan"
  description = "Usage Plan to setup an api key"
  
  api_stages {
    api_id = aws_api_gateway_rest_api.api.id
    stage  = aws_api_gateway_deployment.deployment.stage_name
  }

  quota_settings {
    limit  = 10000
    offset = 2
    period = "WEEK"
  }

  throttle_settings {
    burst_limit = 20
    rate_limit  = 40
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