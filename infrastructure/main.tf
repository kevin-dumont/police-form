provider "aws" {
  region = var.aws_region
}

module "traveler_form_create_lambda" {
  source         = "../packages/api/traveler-form/create/infrastructure"
  lambda_role    =  {
    id = aws_iam_role.iam_for_lambda.name
    arn = aws_iam_role.iam_for_lambda.arn
  }
  dynamodb_table = aws_dynamodb_table.traveler_form.arn

}