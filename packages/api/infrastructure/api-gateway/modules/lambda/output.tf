output "function_invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
  description = "The ARN of the lambda function"
}

output "function_name" {
  value = aws_lambda_function.lambda.function_name
  description = "The ARN of the lambda function"
}
