resource "aws_lambda_function" "lambda" {
  function_name    = "${var.env}-${var.function_name}"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  runtime          = "nodejs18.x"

  s3_bucket        = "traveler-form-terraform"
  s3_key           = var.s3_path

  tags = {
    Name        = "Lambda"
    Environment = var.env
  }
}