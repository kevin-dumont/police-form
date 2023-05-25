
module "traveler_form_create_lambda" {
  source = "../../resources/traveler-form/create/infrastructure"
  
  dynamodb_table = var.dynamodb_tables.traveler_form_arn
  api_gateway_config = {
    rest_api_arn    = aws_api_gateway_rest_api.api.execution_arn
    rest_api_id     = aws_api_gateway_rest_api.api.id
    parent_id       = aws_api_gateway_rest_api.api.root_resource_id
    allowed_origins = var.allowed_origins
  }
}
