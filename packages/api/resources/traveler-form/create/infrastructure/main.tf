module "traveler_form_create_lambda" {
  source          = "../../../../infrastructure/api-gateway/modules/lambda"
  
  module_path     = path.module
  function_name   = "traveler_form_create"
  dynamodb_table  = var.dynamodb_table
}