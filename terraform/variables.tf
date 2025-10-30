# Input Variables for GitHub Copilot All-in-One Demo Infrastructure
# These variables allow customization of the infrastructure deployment

#------------------------------------------------------------------------------
# Application Configuration
#------------------------------------------------------------------------------

variable "application_names" {
  description = "List of application names to create ECR repositories and resources for"
  type        = list(string)
  default = [
    "java-springboot",
    "dotnet-aspnetcore",
    "python-flask",
    "typescript-express",
    "react-app",
    "angular-app",
    "cobol-app"
  ]
}

#------------------------------------------------------------------------------
# AWS Configuration
#------------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "availability_zones" {
  description = "List of availability zones to use for the VPC"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

#------------------------------------------------------------------------------
# CloudWatch Configuration
#------------------------------------------------------------------------------

variable "enable_container_insights" {
  description = "Enable CloudWatch Container Insights for ECS cluster"
  type        = bool
  default     = true
}

#------------------------------------------------------------------------------
# Common Tags
#------------------------------------------------------------------------------

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default = {
    Project    = "ghcp-allinone-demo"
    ManagedBy  = "Terraform"
    Repository = "ghcp-allinone-demo"
    Owner      = "DevOps"
    CostCenter = "Engineering"
    Compliance = "None"
  }
}

#------------------------------------------------------------------------------
# ECR Configuration
#------------------------------------------------------------------------------

variable "ecr_image_count" {
  description = "Number of tagged images to retain in ECR repositories"
  type        = number
  default     = 10
}

variable "ecr_untagged_days" {
  description = "Number of days to retain untagged images in ECR"
  type        = number
  default     = 7
}

#------------------------------------------------------------------------------
# Environment
#------------------------------------------------------------------------------

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

#------------------------------------------------------------------------------
# Logging Configuration
#------------------------------------------------------------------------------

variable "log_retention_days" {
  description = "Number of days to retain CloudWatch logs"
  type        = number
  default     = 7

  validation {
    condition = contains([
      1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180,
      365, 400, 545, 731, 1827, 3653
    ], var.log_retention_days)
    error_message = "Log retention days must be a valid CloudWatch Logs retention period."
  }
}

#------------------------------------------------------------------------------
# Networking Configuration
#------------------------------------------------------------------------------

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

#------------------------------------------------------------------------------
# Project Configuration
#------------------------------------------------------------------------------

variable "project_name" {
  description = "Project name used for resource naming and tagging"
  type        = string
  default     = "ghcp-demo"
}

#------------------------------------------------------------------------------
# Public Subnet Configuration
#------------------------------------------------------------------------------

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

#------------------------------------------------------------------------------
# VPC Configuration
#------------------------------------------------------------------------------

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}
