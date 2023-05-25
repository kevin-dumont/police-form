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
  })
}


variable "allowed_origins" {
  description = "List of allowed origins"
  type        = list(string)
}

variable "allowed_headers" {
  description = "List of allowed headers"
  type        = list(string)
  default     = ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token", "X-Amz-User-Agent"]
}

variable "allowed_methods" {
  description = "List of allowed methods"
  type        = list(string)
  default     = ["OPTIONS", "POST", "GET", "PUT", "PATCH", "DElETE"]
}