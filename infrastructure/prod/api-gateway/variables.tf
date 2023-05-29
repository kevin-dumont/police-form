
variable "dynamodb_tables" {
  description = "Tables for lambdas"
  type        = object({
    traveler_form_arn = string
  })
}

variable "api_key" {
  description = "Api Key"
  type = string
}

variable "env" {
  description = "Environment"
  type = string
}