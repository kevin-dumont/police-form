output "tables" {
  description = "Exports tables"
  value = {
    traveler_form = aws_dynamodb_table.traveler_form.arn
  }
}
