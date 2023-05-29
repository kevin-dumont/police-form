variable "name" {
  description = "Name of Api Gateway"
  type = string
}

variable "description" {
  description = "Description of Api Gateway"
  type = string
}

variable "api_key" {
  description = "The api key"
  type = string
}

variable "env" {
  description = "Environment"
  type = string
}

variable "config" {
  description = "Config"
  type = object({
    aws_account = string
    aws_region = string
  })
}

variable "swagger_template" {
  description = "Swagger template"
  type = any
}