
variable "bucket_name" {
  description = "Name of the bucket"
  type = string
}

variable "bucket_domain_name" {
  description = "Domain name of the bucket"
  type = string
}

variable "env" {
  description = "Environment"
  type = string 
}

variable "domain_name" {
  description = "Domain name"
  type = string
}

variable "acm_certificate_arn" {
  description = "Certificate ARN"
  type = string
}