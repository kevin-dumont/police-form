data "aws_region" "current" {}

locals {
  template = {
    swagger = templatefile(
      "${path.module}/swagger/tf_swagger.yaml",
      {
        aws_account = var.config.aws_account
        aws_region  = data.aws_region.current.name
      }
    )
  }
}
