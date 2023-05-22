
# DynamoDB Table
resource "aws_dynamodb_table" "traveler_form" {
  name           = "traveler-form"
  hash_key       = "id"
  read_capacity  = 20
  write_capacity = 20
  
  attribute {
    name = "id"
    type = "N"
  }
}
