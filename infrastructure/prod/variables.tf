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

variable "api_domain" {
  description = "Api domain name"
  type = string
}

variable "cloudfront_domain" {
  description = "Cloudfront domain name"
  type = string
}

variable "domain_certificate_arn" {
  description = "Certificate arn"
  type = string
}

variable "route53_zone_id" {
  description = "Zone id"
  type = string
}