module "traveler_form_create_lambda" {
  source          = "../../../../infrastructure/api-gateway/modules/lambda"
  
  module_path     = path.module
  function_name   = "traveler_form_create"
  dynamodb_table  = var.dynamodb_table
}

resource "aws_lambda_permission" "permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.traveler_form_create_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_execution_arn}/*/*/*"
}