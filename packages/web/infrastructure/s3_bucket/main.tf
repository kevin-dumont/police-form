
# S3 bucket for web
resource "aws_s3_bucket" "traveler_form_web" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "traveler_form_web_website_configuration" {
  bucket = aws_s3_bucket.traveler_form_web.id

  index_document {
    suffix = "index.html"
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_name}/*"]

    principals {
      type        = "AWS"
      identifiers = [var.oai_iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "traveler_form_web_policy" {
  bucket = aws_s3_bucket.traveler_form_web.id
  policy = data.aws_iam_policy_document.s3_policy.json
}