# Input variables for the Terraform configuration
# Variables are listed in alphabetical order

# variable "aws_region" {
#   description = "AWS region where resources will be created"
#   type        = string
#   default     = "us-east-1"
# }

# variable "environment" {
#   description = "Environment name (e.g., dev, staging, prod)"
#   type        = string
#   default     = "dev"
#
#   validation {
#     condition     = contains(["dev", "staging", "prod"], var.environment)
#     error_message = "Environment must be dev, staging, or prod."
#   }
# }

# variable "project_name" {
#   description = "Name of the project"
#   type        = string
#   default     = "ghcp-demo"
# }
