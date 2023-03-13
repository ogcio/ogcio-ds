terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/s3"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  s3_bucket_name = "www-storybook-design-system-gov-ie"
  s3_bucket_acl  = "private"
}
