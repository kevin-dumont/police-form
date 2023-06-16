data "aws_s3_object" "object" {
  bucket = "traveler-form-terraform"
  key    = var.s3_path
}

resource "aws_lambda_function" "lambda" {
  function_name    = "${var.env}-${var.function_name}"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "build/index.handler"
  runtime          = "nodejs18.x"

  s3_bucket        = data.aws_s3_object.object.bucket
  s3_key           = data.aws_s3_object.object.key
  source_code_hash = data.aws_s3_object.object.etag

  tags = {
    Name        = "Lambda"
    Environment = var.env
  }

   environment {
    variables = {
      NODE_ENV = var.env
    }
  }
}