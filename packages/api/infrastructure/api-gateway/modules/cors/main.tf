resource "aws_api_gateway_method_response" "cors_response" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = var.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true,
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
  }
}

resource "aws_api_gateway_integration_response" "cors_integration" {
  depends_on  = [aws_api_gateway_method_response.cors_response]
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = var.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "\"${join(",", var.allowed_origins)}\"",
    "method.response.header.Access-Control-Allow-Headers" = "\"${join(",", var.allowed_headers)}\"",
    "method.response.header.Access-Control-Allow-Methods" = "\"${join(",", var.allowed_methods)}\""
  }
}