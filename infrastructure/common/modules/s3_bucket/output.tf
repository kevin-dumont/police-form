output "domain_name" {
  description = "Bucket domain name"
  value = aws_s3_bucket.traveler_form_web.bucket_regional_domain_name
}

output "name" {
  description = "Bucket name"
  value = var.bucket_name
}