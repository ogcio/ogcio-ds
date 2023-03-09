terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/acm"
}

include {
  path = find_in_parent_folders()
}

inputs = {
}
