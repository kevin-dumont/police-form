resource "aws_iam_role_policy" "this" {
  name_prefix = "allow_write_log_"
  role        = var.role_id
  policy      = data.aws_iam_policy_document.this.json

}

data "aws_iam_policy_document" "this" {
  statement {
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:*"]

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:CreateLogGroup",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams"
    ]
  }
}