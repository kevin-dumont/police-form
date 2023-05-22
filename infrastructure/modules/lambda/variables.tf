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
