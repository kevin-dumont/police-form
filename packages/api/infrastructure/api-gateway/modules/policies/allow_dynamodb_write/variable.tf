variable "resources" {
  type        = list(string)
  description = "List of dynamodb table name and/or index"
}

variable "role_id" {
  description = "IAM Role id"
}