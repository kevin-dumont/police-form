variable "name" {
  type = string
  description = "Name of Api Gateway"
}

variable "description" {
  type = string
  description = "Description of Api Gateway"
}

variable "api_key" {
  type = string
  description = "The api key"
}

variable "dynamodb_tables" {
  description = "DynamoDB Tables"
  type = object({
    traveler_form_arn = string
  })
}

variable "config" {
  description = "Config"
  type = object({
    aws_account = string
    aws_region = string
  })
}
