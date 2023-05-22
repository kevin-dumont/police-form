output "lambda_function_arn" {
  value = module.traveler_form_create_lambda.function_invoke_arn
  description = "The ARN of the lambda function"
}
