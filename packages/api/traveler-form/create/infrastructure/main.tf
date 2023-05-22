resource "aws_lambda_function" "traveler_form_create" {
  filename         = "${path.module}/../build/handler.zip"
  function_name    = "traveler-form-create"
  role             = var.lambda_role.arn
  handler          = "build/index.handler"
  source_code_hash = filebase64sha256("${path.module}/../build/handler.zip")

  runtime = "nodejs18.x"

  environment {
    variables = {
      DYNAMODB_TABLE = var.dynamodb_table
    }
  }
}

resource "aws_iam_role_policy" "lambda" {
  name = "lambda"
  role = var.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        Effect = "Allow",
        Resource = var.dynamodb_table
      }
    ]
  })
}
