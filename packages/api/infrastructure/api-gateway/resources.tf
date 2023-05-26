
module "traveler_form_create_lambda" {
  source = "../../resources/traveler-form/create/infrastructure"
  
  dynamodb_table = var.dynamodb_tables.traveler_form_arn
}
