# Locals
locals {
    dirs             = split("/", path_relative_to_include())
    environment      = element(local.dirs, 0)
    aws_region       = element(local.dirs, 1)
    org              = "OGCIO"
    project          = "ds"
}

remote_state {
    backend = "s3"
    config = {
        encrypt = true
        bucket = join("-", [
            "tf",
            lower(local.org),
            lower(local.environment),
            lower(local.aws_region),
            lower(local.project),
            "tfstate",
        ])
        key = "${path_relative_to_include()}/terraform.tfstate"
        region = local.aws_region
    }
}

inputs = {
    aws_region       = local.aws_region
    environment      = local.environment
    org              = local.org
    project          = local.project
    tags = {
        Project      = local.project
        Organization = local.org
        Environment  = local.environment
    }
}
