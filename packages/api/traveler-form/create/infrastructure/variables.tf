
variable "lambda_role" {
  description = "IAM role name for the Lambda function"
  type = object({ id = string, arn = string })
}

variable "dynamodb_table" {
  description = "Table for lambda"
  type        = string
}
