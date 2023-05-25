
resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = var.api_gateway_config.rest_api_id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = aws_api_gateway_method.method.http_method
  
  type                    = "AWS_PROXY"
  integration_http_method = var.api_gateway_config.http_method
  uri                     = aws_lambda_function.lambda.invoke_arn
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = var.api_gateway_config.rest_api_id
  parent_id   = var.api_gateway_config.parent_id
  path_part   = var.api_gateway_config.path_part
}

resource "aws_api_gateway_method" "method" {
  resource_id      = aws_api_gateway_resource.resource.id
  rest_api_id      = var.api_gateway_config.rest_api_id
  http_method      = var.api_gateway_config.http_method
  
  authorization    = "NONE"
  api_key_required = true
}

# resource "aws_api_gateway_method_response" "cors_response" {
#   rest_api_id = var.api_gateway_config.rest_api_id
#   resource_id = aws_api_gateway_resource.resource.id
#   http_method = var.api_gateway_config.http_method
#   status_code = "200"

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Origin" = true,
#     "method.response.header.Access-Control-Allow-Headers" = true,
#     "method.response.header.Access-Control-Allow-Methods" = true,
#   }
# }

# resource "aws_api_gateway_integration_response" "cors_integration" {
#   depends_on  = [aws_api_gateway_method_response.cors_response]
#   rest_api_id = var.api_gateway_config.rest_api_id
#   resource_id = aws_api_gateway_resource.resource.id
#   http_method = var.api_gateway_config.http_method
#   status_code = "200"

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Origin" = "\"${join(",", var.allowed_origins)}\"",
#     "method.response.header.Access-Control-Allow-Headers" = "\"${join(",", var.allowed_headers)}\"",
#     "method.response.header.Access-Control-Allow-Methods" = "\"${join(",", var.allowed_methods)}\""
#   }
# }