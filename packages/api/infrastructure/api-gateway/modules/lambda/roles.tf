module "allow_write_log" {
  source = "../policies/allow_write_log"

  role_id = aws_iam_role.iam_for_lambda.id
}

module "allow_dynamodb_write" {
  source = "../policies/allow_dynamodb_write"
  role_id = aws_iam_role.iam_for_lambda.id
  resources = [ var.dynamodb_table ]
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
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
