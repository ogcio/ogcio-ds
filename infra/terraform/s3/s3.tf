resource "aws_s3_bucket" "bucket" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.bucket.id
  acl    = var.s3_bucket_acl
}

resource "aws_s3_bucket_versioning" "bucket_versioning" {
  bucket = aws_s3_bucket.bucket.id

  versioning_configuration {
    status = var.s3_bucket_versioning
  }
}

resource "aws_s3_bucket_website_configuration" "bucket_website" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = var.s3_bucket_website_index
  }

  error_document {
    key = var.s3_bucket_website_error
  }
}
