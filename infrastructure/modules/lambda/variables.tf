variable "module_path" {
  description = "Module path"
  type        = string
}

variable "function_name" {
  description = "Function name"
  type        = string
}

variable "dynamodb_table" {
  description = "Table for lambda"
  type        = string
}

variable "api_gateway_arn" {
  description = "Api Gateway arn"
  type        = string
}
