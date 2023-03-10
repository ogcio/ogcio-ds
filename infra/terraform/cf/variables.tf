variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "tags" {
  description = "Default tags"
  type = object({
    Project      = string
    Organization = string
    Environment  = string
  })
}

variable "s3_bucket_arn" {
  description = "S3 Bucket ARN"
  type        = string
}

variable "s3_bucket_id" {
  description = "S3 Bucket ID"
  type        = string
}

variable "cf_policy_document_statement_effect" {
  description = "Policy document statement effect"
  type        = string
}

variable "cf_policy_document_statement_actions" {
  description = "Policy document statement actions for S3 OAI"
  type        = list(string)
}

variable "cf_policy_document_principals_type" {
  description = "Policy document principals type"
  type        = string  
}

variable "cf_enabled" {
  description = "CF enabled"
  type        = bool
  default     = true
}

variable "cf_comment" {
  description = "CF Comment"
  type        = string
}

variable "cf_default_root_object" {
  description = "CF default root object"
  type        = string
  default     = "index.html"
}

variable "cf_price_class" {
  description = "CF Price Class"
  type        = string
  default     = "PriceClass_All"
}

variable "cf_cache_policy_id" {
  description = "CF Cache Policy ID"
  type = string
}

variable "cf_cache_allowed_methods" {
  description = "CF cache allowed methods"
  type        = list(string)
}

variable "cf_cache_cached_methods" {
  description = "CF cache cached methods"
  type        = list(string)
}

variable "cf_cache_viewer_protocol_policy" {
  description = "CF cache viewer protocol policy"
  type        = string
  default     = "allow-all"
}

variable "cf_cache_ttl_min" {
  description = "CF cache min TTL"
  type        = number
  default     = 0
}

variable "cf_cache_ttl_default" {
  description = "CF cache default TTL"
  type        = number
  default     = 86400
}

variable "cf_cache_ttl_max" {
  description = "CF cache max TTL"
  type        = number
  default     = 31536000
}

variable "cf_cache_compress" {
  description = "CF cache compress"
  type        = bool
  default     = false  
}

variable "cf_geo_restriction_type" {
  description = "CF Geo restriction type"
  type        = string
  default     = "none"
}

variable "cf_aliases" {
  description = "Custom domains"
  type        = list(string)
}

variable "cf_viewer_certificate_arn" {
  description = "ACM certificate ARN"
  type        = string
}

variable "cf_viewer_certificate_ssl_support_method" {
  description = "Viewer certificate SSL support method"
  type        = string
}