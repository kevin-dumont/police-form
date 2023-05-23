module "traveler_form_create_lambda" {
  source          = "../../../../../infrastructure/modules/lambda"
  module_path     = path.module
  function_name   = "traveler_form_create"
  dynamodb_table  = var.dynamodb_table
  api_gateway_arn = var.api_gateway_arn
}