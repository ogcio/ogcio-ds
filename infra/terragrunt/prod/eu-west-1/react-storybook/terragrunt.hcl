terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/s3"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  s3_bucket_name = "storybook-react-design-system-blocks-gov-ie"
  s3_bucket_acl  = "private"
}
