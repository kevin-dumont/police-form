
variable "dynamodb_table" {
  description = "Table for lambda"
  type        = string
}

variable "api_gateway_arn" {
  description = "Api Gateway arn"
  type        = string
}
