
variable "dynamodb_table" {
  description = "Table for lambda"
  type        = string
}

variable "api_gateway_config" {
  type = object({
    rest_api_arn    = string
    rest_api_id     = string
    parent_id       = string
    allowed_origins = list(string)
  })
}