
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

variable "certificate_arn" {
  description = "Domain certificate"
  type = string
}

variable "domain_name" {
  description = "Domain name"
  type = string
}