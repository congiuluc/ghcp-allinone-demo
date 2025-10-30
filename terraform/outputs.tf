# Output Values for GitHub Copilot All-in-One Demo Infrastructure
# These outputs provide important information about the created infrastructure

#------------------------------------------------------------------------------
# ALB Outputs
#------------------------------------------------------------------------------

output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = module.alb.arn
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.dns_name
}

output "alb_listener_http_arn" {
  description = "ARN of the HTTP listener"
  value       = aws_lb_listener.http.arn
}

output "alb_security_group_id" {
  description = "Security Group ID of the Application Load Balancer"
  value       = aws_security_group.alb.id
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = module.alb.zone_id
}

#------------------------------------------------------------------------------
# CloudWatch Outputs
#------------------------------------------------------------------------------

output "cloudwatch_log_groups" {
  description = "Map of application names to CloudWatch Log Group names"
  value = {
    for app, lg in aws_cloudwatch_log_group.apps : app => lg.name
  }
}

#------------------------------------------------------------------------------
# ECR Outputs
#------------------------------------------------------------------------------

output "ecr_repository_urls" {
  description = "Map of application names to ECR repository URLs"
  value = {
    for app, repo in aws_ecr_repository.apps : app => repo.repository_url
  }
}

#------------------------------------------------------------------------------
# ECS Outputs
#------------------------------------------------------------------------------

output "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
  value       = aws_ecs_cluster.main.arn
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "ecs_task_execution_role_arn" {
  description = "ARN of the ECS task execution IAM role"
  value       = aws_iam_role.ecs_task_execution.arn
}

output "ecs_task_role_arn" {
  description = "ARN of the ECS task IAM role"
  value       = aws_iam_role.ecs_task.arn
}

output "ecs_task_security_group_id" {
  description = "Security Group ID for ECS tasks"
  value       = aws_security_group.ecs_tasks.id
}

#------------------------------------------------------------------------------
# Environment Outputs
#------------------------------------------------------------------------------

output "environment" {
  description = "Current environment name"
  value       = var.environment
}

#------------------------------------------------------------------------------
# Networking Outputs
#------------------------------------------------------------------------------

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = module.vpc.private_subnets
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = module.vpc.public_subnets
}

#------------------------------------------------------------------------------
# S3 Outputs
#------------------------------------------------------------------------------

output "s3_static_assets_bucket_name" {
  description = "Name of the S3 bucket for static assets"
  value       = aws_s3_bucket.static_assets.id
}

#------------------------------------------------------------------------------
# VPC Outputs
#------------------------------------------------------------------------------

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}
