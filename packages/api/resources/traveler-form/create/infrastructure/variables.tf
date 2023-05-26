
variable "dynamodb_table" {
  description = "Table for lambda"
  type        = string
}

variable "api_execution_arn" {
  type = string
}