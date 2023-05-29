
module "traveler_form_create_lambda" {
  source = "./resources/traveler-form-create-v1"
  
  env = var.env
  api_execution_arn = module.api_gateway.api_execution_arn
  traveler_form_table = var.dynamodb_tables.traveler_form_arn
}