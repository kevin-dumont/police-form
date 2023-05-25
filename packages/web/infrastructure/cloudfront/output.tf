

output "oai_iam_arn" {
  description = "OAI iam arn"
  value = aws_cloudfront_origin_access_identity.oai.iam_arn
}