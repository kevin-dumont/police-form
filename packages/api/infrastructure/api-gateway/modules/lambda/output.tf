output "function_invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
  description = "The ARN of the lambda function"
}

output "integration" {
  value = aws_api_gateway_integration.integration
  description = "The Api Gateway integration"
}
