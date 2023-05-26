
module "traveler_form_create_lambda" {
  source = "../../resources/traveler-form/create/infrastructure"
  
  dynamodb_table = var.dynamodb_tables.traveler_form_arn
  api_execution_arn = aws_api_gateway_rest_api.api.execution_arn
}