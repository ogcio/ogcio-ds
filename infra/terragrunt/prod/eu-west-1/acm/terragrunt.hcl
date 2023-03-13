terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/acm"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  acm_domain_name               = "storybook.design-system.ogcio.gov.ie"
  acm_subject_alternative_names = [
    "www.storybook.design-system.ogcio.gov.ie"
  ]
}
