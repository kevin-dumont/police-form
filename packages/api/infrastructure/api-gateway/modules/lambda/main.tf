resource "aws_lambda_function" "lambda" {
  filename         = "${var.module_path}/../build/handler.zip"
  function_name    = var.function_name
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  source_code_hash = filebase64sha256("${var.module_path}/../build/handler.zip")
  runtime          = "nodejs18.x"
}