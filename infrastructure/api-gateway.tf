

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