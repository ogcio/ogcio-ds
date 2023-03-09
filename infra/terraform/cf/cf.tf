data "aws_iam_policy_document" "s3_policy" {
  statement {
    effect    = var.cf_policy_document_statement_effect
    actions   = var.cf_policy_document_statement_actions
    resources = ["${var.s3_bucket_arn}/*"]

    principals {
      type        = var.cf_policy_document_principals_type
      identifiers = [aws_cloudfront_origin_access_identity.cf_oai.iam_arn]
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "cf_oai" {
  comment = "${var.s3_bucket_id}.s3.${var.aws_region}.amazonaws.com"
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
  bucket = var.s3_bucket_id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${var.s3_bucket_id}.s3.${var.aws_region}.amazonaws.com"
    origin_id   = "${var.s3_bucket_id}.s3.${var.aws_region}.amazonaws.com"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cf_oai.cloudfront_access_identity_path
    }
  }

  enabled             = var.cf_enabled
  comment             = var.cf_comment
  default_root_object = var.cf_default_root_object
  price_class         = var.cf_price_class

  # aliases = ["mysite.example.com", "yoursite.example.com"]

  default_cache_behavior {
    allowed_methods  = var.cf_cache_allowed_methods
    cached_methods   = var.cf_cache_cached_methods
    target_origin_id = "${var.s3_bucket_id}.s3.${var.aws_region}.amazonaws.com"
    cache_policy_id  = var.cf_cache_policy_id

    min_ttl                = var.cf_cache_ttl_min
    default_ttl            = var.cf_cache_ttl_default
    max_ttl                = var.cf_cache_ttl_max
    compress               = var.cf_cache_compress
    viewer_protocol_policy = var.cf_cache_viewer_protocol_policy
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = var.cf_geo_restriction_type
    }
  }
}
