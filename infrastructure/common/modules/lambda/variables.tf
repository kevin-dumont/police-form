variable "s3_path" {
  description = "S3 Module path"
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

variable "env" {
  description = "Environment"
  type        = string
}