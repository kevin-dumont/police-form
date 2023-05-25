module "traveler_form_create_lambda" {
  source          = "../../../../infrastructure/api-gateway/modules/lambda"
  
  module_path     = path.module
  function_name   = "traveler_form_create"
  dynamodb_table  = var.dynamodb_table
  allowed_origins = var.api_gateway_config.allowed_origins
  api_gateway_config = {
    path_part   = "traveler-form"
    http_method = "POST"
    parent_id = var.api_gateway_config.parent_id
    rest_api_arn = var.api_gateway_config.rest_api_arn
    rest_api_id = var.api_gateway_config.rest_api_id
  }
}