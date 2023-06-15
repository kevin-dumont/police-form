output "domain_name" {
  description = "domain name"
  value = aws_api_gateway_domain_name.api_gateway_domain.cloudfront_domain_name
}

output "hosted_zone_id" {
  description = "hosted zone id"
  value = aws_api_gateway_domain_name.api_gateway_domain.cloudfront_zone_id
}

