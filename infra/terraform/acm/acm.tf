resource "aws_acm_certificate" "acm_cert" {
  domain_name               = var.acm_domain_name
  subject_alternative_names = var.acm_subject_alternative_names
  validation_method         = var.acm_validation_method

  tags = {
    Domain = var.acm_domain_name
  }

  lifecycle {
    create_before_destroy = true
  }
}
