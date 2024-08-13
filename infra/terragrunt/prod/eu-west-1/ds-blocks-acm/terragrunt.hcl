terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/acm"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  acm_domain_name               = "storybook-react.design-system.blocks.gov.ie"
  acm_subject_alternative_names = [
    "storybook-html.design-system.blocks.gov.ie"
  ]
}
