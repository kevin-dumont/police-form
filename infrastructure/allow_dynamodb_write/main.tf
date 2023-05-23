resource "aws_iam_role_policy" "this" {
  name_prefix = "allow_write_on_dynamodb_"
  role        = var.role_id
  policy      = data.aws_iam_policy_document.this.json
}

data "aws_iam_policy_document" "this" {
  statement {
    effect    = "Allow"
    resources = var.resources

    actions = [
      "dynamodb:BatchWriteItem",
      "dynamodb:DescribeTable",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem"
    ]
  }
}