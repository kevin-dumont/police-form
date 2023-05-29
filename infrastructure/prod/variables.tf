variable "AWS_REGION" {
  description = "AWS Region"
  type = string
} 

variable "WEB_BUCKET_NAME" {
  description = "Name of the bucket"
  type = string
}

variable "API_KEY" {
  description = "Api gateway api key"
  type = string
}

variable "env" {
  description = "Environment"
  default = "prod"
  type = string
}