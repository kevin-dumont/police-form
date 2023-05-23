resource "aws_lambda_function" "lambda" {
  filename         = "${var.module_path}/../build/handler.zip"
  function_name    = var.function_name
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  source_code_hash = filebase64sha256("${var.module_path}/../build/handler.zip")

  runtime = "nodejs18.x"

}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_gateway_arn}/*/*"
}

module "policy_dynamodb_write" {
  source = "../../allow_dynamodb_write"
  role_id = aws_iam_role.iam_for_lambda.id
  resources = [ var.dynamodb_table ]
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}