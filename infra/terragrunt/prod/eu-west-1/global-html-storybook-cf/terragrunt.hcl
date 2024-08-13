terraform {
    source = "${get_parent_terragrunt_dir()}/../terraform/cf"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  s3_bucket_arn = "arn:aws:s3:::storybook-html-design-system-blocks-gov-ie"
  s3_bucket_id  = "storybook-html-design-system-blocks-gov-ie"

  acm_cert_domain_name = "storybook-html.design-system.blocks.gov.ie"

  cf_aliases = []

  cf_viewer_certificate_arn                = "arn:aws:acm:us-east-1:782102975611:certificate/e97877f7-2bf7-493c-b349-25dca165c2a5"
  cf_viewer_certificate_ssl_support_method = "sni-only"

  cf_policy_document_statement_effect  = "Allow"
  cf_policy_document_statement_actions = ["s3:GetObject"]
  cf_policy_document_principals_type   = "AWS"

  cf_comment     = "Terraform CF for S3 Static Website"
  cf_price_class = "PriceClass_100"
  
  cf_cache_viewer_protocol_policy = "redirect-to-https"
  cf_cache_allowed_methods        = ["GET", "HEAD"]
  cf_cache_cached_methods         = ["GET", "HEAD"]
  cf_cache_policy_id              = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  cf_cache_compress               = true
}
