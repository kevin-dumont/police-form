output "tables" {
  description = "Exports tables"
  value = {
    traveler_form_arn = aws_dynamodb_table.traveler_form.arn
  }
}
