
# DynamoDB Table
resource "aws_dynamodb_table" "traveler_form" {
  name           = "traveler-form"
  hash_key       = "id"
  read_capacity  = 20
  write_capacity = 20
  table_class    = "STANDARD_INFREQUENT_ACCESS"
  
  attribute {
    name = "id"
    type = "S"
  }
}
