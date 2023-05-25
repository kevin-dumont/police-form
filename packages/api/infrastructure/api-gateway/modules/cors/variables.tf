variable "rest_api_id" {
  description = "Api rest id"
  type        = string
}

variable "resource_id" {
  description = "Api rest resource id"
  type        = string
}

variable "http_method" {
  description = "Api rest resource id"
  type        = string
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