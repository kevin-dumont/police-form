resource "aws_lambda_function" "lambda" {
  filename         = "${var.module_path}/../build/handler.zip"
  function_name    = var.function_name
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  source_code_hash = filebase64sha256("${var.module_path}/../build/handler.zip")

  runtime = "nodejs18.x"

  environment {
    variables = {
      DYNAMODB_TABLE = var.dynamodb_table
    }
  }
}

resource "aws_iam_role_policy" "lambda" {
  name = "lambda"
  role = aws_iam_role.iam_for_lambda.id

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

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid = ""
      },
    ],
  })
}