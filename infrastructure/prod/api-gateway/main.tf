data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

module "api_gateway" {
  source = "../../common/modules/api-gateway"

  name             = "${var.env}-traveler-form-api"
  description      = "Traveler Form API"
  api_key          = var.api_key
  env              = var.env
  swagger_template = local.template.swagger

  config = {
    aws_region = data.aws_region.current.name
    aws_account = data.aws_caller_identity.current.account_id
  }

}

resource "aws_api_gateway_domain_name" "api_gateway_domain" {
  certificate_arn = var.certificate_arn
  domain_name     = var.domain_name
}

resource "aws_api_gateway_base_path_mapping" "base_path_mapping" {
  api_id      = module.api_gateway.api_id
  domain_name = aws_api_gateway_domain_name.api_gateway_domain.domain_name
  stage_name  = module.api_gateway.stage_name
}