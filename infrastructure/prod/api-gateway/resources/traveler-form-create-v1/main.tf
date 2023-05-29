module "traveler_form_create_lambda_v1" {
  source = "../../../../common/modules/lambda"
  
  function_name   = "traveler_form_create"
  s3_path       = "${var.env}/build/sygmaa-api-traveler-form-create.zip"
  dynamodb_table  = var.traveler_form_table
  env             = var.env
}

resource "aws_lambda_permission" "permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.traveler_form_create_lambda_v1.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*/*"
}