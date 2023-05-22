output "lambda_function_arn" {
  value = aws_lambda_function.traveler_form_create.arn
  description = "The ARN of the lambda function"
}
