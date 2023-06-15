output "oai_iam_arn" {
  description = "OAI iam arn"
  value = aws_cloudfront_origin_access_identity.oai.iam_arn
}

output "domain_name" {
  description = "s3 domain name"
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "hosted_zone_id" {
  description = "s3 hosted zone id"
  value = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}

