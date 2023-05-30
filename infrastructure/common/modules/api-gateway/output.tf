output "api_execution_arn" {
  value = aws_api_gateway_rest_api.api.execution_arn
}

output "api_id" {
  value = aws_api_gateway_rest_api.api.id
}
  
output "stage_name" {
  value = aws_api_gateway_deployment.deployment.stage_name
}