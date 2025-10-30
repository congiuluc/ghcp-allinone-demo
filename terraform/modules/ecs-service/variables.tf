# ECS Service Module - Variables

#------------------------------------------------------------------------------
# Application Configuration
#------------------------------------------------------------------------------

variable "app_name" {
  description = "Name of the application"
  type        = string
}

#------------------------------------------------------------------------------
# Auto Scaling Configuration
#------------------------------------------------------------------------------

variable "autoscaling_cpu_target" {
  description = "Target CPU utilization percentage for auto scaling"
  type        = number
  default     = 70
}

variable "autoscaling_max_capacity" {
  description = "Maximum number of tasks for auto scaling"
  type        = number
  default     = 10
}

variable "autoscaling_memory_target" {
  description = "Target memory utilization percentage for auto scaling"
  type        = number
  default     = 80
}

variable "autoscaling_min_capacity" {
  description = "Minimum number of tasks for auto scaling"
  type        = number
  default     = 1
}

#------------------------------------------------------------------------------
# AWS Configuration
#------------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region"
  type        = string
}

#------------------------------------------------------------------------------
# Common Tags
#------------------------------------------------------------------------------

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}

#------------------------------------------------------------------------------
# Container Configuration
#------------------------------------------------------------------------------

variable "container_image" {
  description = "Docker image URL for the container"
  type        = string
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
}

#------------------------------------------------------------------------------
# CPU and Memory
#------------------------------------------------------------------------------

variable "cpu" {
  description = "CPU units for the task (256, 512, 1024, 2048, 4096)"
  type        = number
  default     = 256
}

#------------------------------------------------------------------------------
# Desired Count
#------------------------------------------------------------------------------

variable "desired_count" {
  description = "Desired number of tasks"
  type        = number
  default     = 1
}

#------------------------------------------------------------------------------
# ECS Configuration
#------------------------------------------------------------------------------

variable "ecs_cluster_id" {
  description = "ID of the ECS cluster"
  type        = string
}

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}

#------------------------------------------------------------------------------
# Enable Auto Scaling
#------------------------------------------------------------------------------

variable "enable_autoscaling" {
  description = "Enable auto scaling for the ECS service"
  type        = bool
  default     = false
}

#------------------------------------------------------------------------------
# Enable Execute Command
#------------------------------------------------------------------------------

variable "enable_execute_command" {
  description = "Enable ECS Exec for debugging"
  type        = bool
  default     = false
}

#------------------------------------------------------------------------------
# Environment
#------------------------------------------------------------------------------

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

#------------------------------------------------------------------------------
# Environment Variables
#------------------------------------------------------------------------------

variable "environment_variables" {
  description = "Environment variables for the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

#------------------------------------------------------------------------------
# Execution Role
#------------------------------------------------------------------------------

variable "execution_role_arn" {
  description = "ARN of the task execution role"
  type        = string
}

#------------------------------------------------------------------------------
# Health Check Command
#------------------------------------------------------------------------------

variable "health_check_command" {
  description = "Health check command for the container"
  type        = string
  default     = ""
}

#------------------------------------------------------------------------------
# Health Check Configuration
#------------------------------------------------------------------------------

variable "health_check_healthy_threshold" {
  description = "Number of consecutive health checks successes required"
  type        = number
  default     = 2
}

variable "health_check_interval" {
  description = "Interval between health checks in seconds"
  type        = number
  default     = 30
}

variable "health_check_matcher" {
  description = "HTTP codes to use when checking for a successful response"
  type        = string
  default     = "200-299"
}

variable "health_check_path" {
  description = "Path for health check endpoint"
  type        = string
  default     = "/"
}

variable "health_check_timeout" {
  description = "Health check timeout in seconds"
  type        = number
  default     = 5
}

variable "health_check_unhealthy_threshold" {
  description = "Number of consecutive health check failures required"
  type        = number
  default     = 3
}

#------------------------------------------------------------------------------
# Launch Type
#------------------------------------------------------------------------------

variable "launch_type" {
  description = "Launch type for ECS service (FARGATE or EC2)"
  type        = string
  default     = "FARGATE"
}

#------------------------------------------------------------------------------
# Listener Configuration
#------------------------------------------------------------------------------

variable "listener_arn" {
  description = "ARN of the ALB listener"
  type        = string
}

variable "listener_rule_priority" {
  description = "Priority for the listener rule (1-50000)"
  type        = number
}

#------------------------------------------------------------------------------
# Log Configuration
#------------------------------------------------------------------------------

variable "log_group_name" {
  description = "Name of the CloudWatch log group"
  type        = string
}

#------------------------------------------------------------------------------
# Memory
#------------------------------------------------------------------------------

variable "memory" {
  description = "Memory for the task in MB (512, 1024, 2048, 4096, 8192, 16384, 30720)"
  type        = number
  default     = 512
}

#------------------------------------------------------------------------------
# Path Patterns
#------------------------------------------------------------------------------

variable "path_patterns" {
  description = "Path patterns for the listener rule"
  type        = list(string)
  default     = ["/*"]
}

#------------------------------------------------------------------------------
# Private Subnets
#------------------------------------------------------------------------------

variable "private_subnet_ids" {
  description = "List of private subnet IDs for ECS tasks"
  type        = list(string)
}

#------------------------------------------------------------------------------
# Project Name
#------------------------------------------------------------------------------

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
}

#------------------------------------------------------------------------------
# Security Group
#------------------------------------------------------------------------------

variable "security_group_id" {
  description = "Security group ID for ECS tasks"
  type        = string
}

#------------------------------------------------------------------------------
# Task Role
#------------------------------------------------------------------------------

variable "task_role_arn" {
  description = "ARN of the task role"
  type        = string
}

#------------------------------------------------------------------------------
# VPC ID
#------------------------------------------------------------------------------

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}
