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
