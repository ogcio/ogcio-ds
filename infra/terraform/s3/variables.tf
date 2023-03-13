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

variable "s3_bucket_name" {
  description = "S3 Bucket Name"
  type        = string
}

variable "s3_bucket_acl" {
  description = "S3 Bucket Access Control List"
  type        = string
}

variable "s3_bucket_versioning" {
  description = "S3 Bucket versioning"
  type        = string
  default     = "Disabled"
}

variable "s3_bucket_website_index" {
  description = "S3 Bucket Website Index Document"
  type        = string
  default     = "index.html"
}

variable "s3_bucket_website_error" {
  description = "S3 Bucket Website Error Document"
  type        = string
  default     = "error.html"
}
