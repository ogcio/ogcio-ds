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
