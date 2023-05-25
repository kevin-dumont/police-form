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

variable "api_gateway_config" {
  description = "Api Gateway configuration"
  type = object({
    rest_api_id  = string
    rest_api_arn = string
    path_part    = string
    http_method  = string
    parent_id    = string
    allowed_origins = list(string)
  })
}