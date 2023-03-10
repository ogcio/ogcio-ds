variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "tags" {
  description = "Default tags"
  type = object({
    Project      = string
    Organization = string
    Environment  = string
  })
}

variable "acm_domain_name" {
  description = "List of domains"
  type        = string
}

variable "acm_subject_alternative_names" {
  description = "Extra domains"
  type        = list(string)
}

variable "acm_validation_method" {
  description = "Certificate validation method"
  type        = string
  default     = "DNS"
}
