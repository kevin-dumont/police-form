locals {
  template = {
    swagger = templatefile(
      "${path.module}/swagger.build.yaml",
      {
        aws_account = data.aws_caller_identity.current.account_id
        aws_region  = data.aws_region.current.name
        env         = var.env
      }
    )
  }
}
