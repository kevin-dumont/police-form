
resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = var.api_gateway_config.rest_api_id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = var.api_gateway_config.http_method
  
  type                    = "AWS_PROXY"
  integration_http_method = var.api_gateway_config.http_method
  uri                     = aws_lambda_function.lambda.arn
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = var.api_gateway_config.rest_api_id
  parent_id   = var.api_gateway_config.parent_id
  path_part   = var.api_gateway_config.path_part
}

resource "aws_api_gateway_method" "method" {
  resource_id   = aws_api_gateway_resource.resource.id
  rest_api_id   = var.api_gateway_config.rest_api_id
  http_method   = var.api_gateway_config.http_method
  authorization = "NONE"
}

module "cors" {
  source = "../cors"
  
  rest_api_id     = var.api_gateway_config.rest_api_id
  resource_id     = aws_api_gateway_resource.resource.id
  http_method     = var.api_gateway_config.http_method
  allowed_origins = var.api_gateway_config.allowed_origins
}
