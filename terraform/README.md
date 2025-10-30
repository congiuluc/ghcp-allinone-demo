# GitHub Copilot All-in-One Demo - Terraform Infrastructure

This directory contains Infrastructure as Code (IaC) using Terraform to deploy and manage the infrastructure for the GitHub Copilot All-in-One Demo applications on AWS.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Infrastructure Components](#infrastructure-components)
- [Outputs](#outputs)
- [Environments](#environments)
- [Cost Estimation](#cost-estimation)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Cleanup](#cleanup)

## 🎯 Overview

This Terraform configuration creates a complete AWS infrastructure to host multiple demo applications:

- **Java Spring Boot** (port 8080)
- **.NET ASP.NET Core** (port 5000)
- **Python Flask** (port 5000)
- **TypeScript Express** (port 3000)
- **React** (port 3000)
- **Angular** (port 4200)
- **COBOL** (port 8080)

The infrastructure uses AWS ECS Fargate for containerized deployments, Application Load Balancer for traffic distribution, and follows AWS best practices for security and scalability.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                    ┌────▼────┐
                    │   ALB   │
                    └────┬────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼────┐     ┌────▼────┐
   │ Public  │      │ Public  │     │ Public  │
   │Subnet-A │      │Subnet-B │     │Subnet-C │
   └─────────┘      └─────────┘     └─────────┘
        │                │                │
        │                │                │
   ┌────▼────┐      ┌────▼────┐     ┌────▼────┐
   │ Private │      │ Private │     │ Private │
   │Subnet-A │      │Subnet-B │     │Subnet-C │
   │         │      │         │     │         │
   │ ECS     │      │ ECS     │     │ ECS     │
   │ Tasks   │      │ Tasks   │     │ Tasks   │
   └─────────┘      └─────────┘     └─────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                    ┌────▼────┐
                    │   ECR   │
                    │   S3    │
                    │CloudWatch│
                    └─────────┘
```

### Key Components:

1. **VPC**: Multi-AZ Virtual Private Cloud with public and private subnets
2. **ECS Fargate Cluster**: Serverless container orchestration
3. **Application Load Balancer**: Layer 7 load balancing with SSL support
4. **ECR Repositories**: Container image registry for each application
5. **CloudWatch**: Centralized logging and monitoring
6. **S3**: Static asset storage
7. **IAM Roles**: Least-privilege access control
8. **Security Groups**: Network-level security

## ✅ Prerequisites

### Required Tools

- **Terraform** >= 1.6.0 ([Install](https://developer.hashicorp.com/terraform/downloads))
- **AWS CLI** >= 2.0 ([Install](https://aws.amazon.com/cli/))
- **Docker** (for building container images) ([Install](https://docs.docker.com/get-docker/))
- **Git** (for version control)

### AWS Account Setup

1. **AWS Account** with appropriate permissions
2. **AWS Credentials** configured:
   ```bash
   aws configure
   # or
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   export AWS_DEFAULT_REGION="us-east-1"
   ```

3. **HCP Terraform Account** (optional, for remote state):
   - Sign up at [https://app.terraform.io/](https://app.terraform.io/)
   - Create an organization
   - Update `backend.tf` with your organization name

### Required Permissions

Your AWS IAM user/role needs permissions to create:
- VPC, Subnets, Internet Gateways, NAT Gateways, Route Tables
- ECS Clusters, Task Definitions, Services
- ECR Repositories
- Application Load Balancers, Target Groups, Listeners
- Security Groups
- IAM Roles and Policies
- CloudWatch Log Groups
- S3 Buckets

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/your-org/ghcp-allinone-demo.git
cd ghcp-allinone-demo/terraform
```

### 2. Configure Variables

```bash
# Copy example configuration
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
vim terraform.tfvars
```

**Minimum required changes:**
```hcl
aws_region  = "us-east-1"          # Your preferred AWS region
environment = "dev"                 # dev, staging, or prod
project_name = "ghcp-demo"          # Your project name
```

### 3. Configure Backend (Optional)

If using HCP Terraform (recommended):

```bash
# Edit backend.tf
vim backend.tf
```

Update the organization name:
```hcl
terraform {
  cloud {
    organization = "your-org-name"  # Your HCP Terraform organization
    workspaces {
      name = "ghcp-allinone-demo"
    }
  }
}
```

If using local state (not recommended for production):
```bash
# Comment out or remove backend.tf
mv backend.tf backend.tf.disabled
```

### 4. Initialize Terraform

```bash
terraform init
```

### 5. Review Plan

```bash
terraform plan
```

### 6. Apply Configuration

```bash
terraform apply
```

Review the plan and type `yes` to confirm.

**Deployment time:** Approximately 5-10 minutes

### 7. Get Outputs

```bash
terraform output
```

## ⚙️ Configuration

### File Structure

```
terraform/
├── main.tf                     # Main infrastructure resources
├── variables.tf                # Input variable definitions
├── outputs.tf                  # Output value definitions
├── providers.tf                # Provider configuration
├── backend.tf                  # Remote state configuration
├── locals.tf                   # Local value definitions
├── terraform.tfvars.example    # Example variable values
├── README.md                   # This file
└── .gitignore                  # Git ignore file
```

### Key Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `aws_region` | AWS region for deployment | `us-east-1` | Yes |
| `environment` | Environment name (dev/staging/prod) | `dev` | Yes |
| `project_name` | Project name for resource naming | `ghcp-demo` | Yes |
| `vpc_cidr` | VPC CIDR block | `10.0.0.0/16` | No |
| `availability_zones` | List of AZs to use | `["us-east-1a", "us-east-1b", "us-east-1c"]` | No |
| `application_names` | List of applications to deploy | See `variables.tf` | No |
| `enable_container_insights` | Enable CloudWatch Container Insights | `true` | No |
| `log_retention_days` | CloudWatch log retention period | `7` | No |
| `common_tags` | Common tags for all resources | See `variables.tf` | No |

### Customization

To customize the infrastructure:

1. **Edit `terraform.tfvars`**:
   ```hcl
   # Example: Change region and environment
   aws_region  = "us-west-2"
   environment = "staging"
   
   # Example: Customize application list
   application_names = [
     "java-springboot",
     "python-flask",
     "react-app"
   ]
   ```

2. **Apply changes**:
   ```bash
   terraform plan
   terraform apply
   ```

## 🚢 Deployment

### Initial Deployment

```bash
# Initialize
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive

# Plan deployment
terraform plan -out=tfplan

# Apply deployment
terraform apply tfplan
```

### Deploy Application Containers

After infrastructure is created, deploy your applications:

```bash
# Get ECR repository URLs
terraform output ecr_repository_urls

# Build and push Docker images (example for Java app)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ecr-url>
docker build -t ghcp-demo/java-springboot:latest ../java
docker tag ghcp-demo/java-springboot:latest <ecr-url>/ghcp-demo/java-springboot:latest
docker push <ecr-url>/ghcp-demo/java-springboot:latest
```

### Create ECS Services

After pushing images, create ECS task definitions and services (example provided in `modules/ecs-service/` - to be created separately).

## 🏗️ Infrastructure Components

### VPC Module

- **Source**: `terraform-aws-modules/vpc/aws` v5.x
- **Features**:
  - Multi-AZ deployment (3 availability zones)
  - Public subnets for ALB
  - Private subnets for ECS tasks
  - NAT Gateway for outbound internet access
  - DNS support enabled

### ECS Cluster

- **Capacity Providers**: FARGATE and FARGATE_SPOT
- **Container Insights**: Configurable via variable
- **Launch Type**: Fargate (serverless)
- **Auto-scaling**: Configured per service

### Application Load Balancer

- **Type**: Application (Layer 7)
- **Scheme**: Internet-facing
- **Listeners**: HTTP (port 80), HTTPS (port 443) - configurable
- **Target Type**: IP (for Fargate)
- **Health Checks**: Configured per application

### ECR Repositories

- **Image Scanning**: Enabled on push
- **Encryption**: AES256
- **Lifecycle Policy**: 
  - Keep last N tagged images (configurable)
  - Remove untagged images after N days (configurable)

### Security Groups

1. **ALB Security Group**:
   - Ingress: 80 (HTTP), 443 (HTTPS) from 0.0.0.0/0
   - Egress: All traffic

2. **ECS Tasks Security Group**:
   - Ingress: All ports from ALB security group
   - Egress: All traffic

### IAM Roles

1. **ECS Task Execution Role**:
   - Pull images from ECR
   - Write logs to CloudWatch
   - AWS managed policy attached

2. **ECS Task Role**:
   - Application-specific permissions
   - Customizable per application

### CloudWatch

- **Log Groups**: One per application
- **Retention**: Configurable (default 7 days)
- **Metrics**: 
  - ECS metrics
  - ALB metrics
  - Custom application metrics

### S3 Bucket

- **Purpose**: Static asset storage
- **Versioning**: Enabled in production
- **Encryption**: AES256
- **Public Access**: Blocked
- **Lifecycle**: Configurable

## 📤 Outputs

The configuration provides the following outputs:

### Network Outputs
```bash
terraform output vpc_id              # VPC ID
terraform output public_subnet_ids   # Public subnet IDs
terraform output private_subnet_ids  # Private subnet IDs
```

### Load Balancer Outputs
```bash
terraform output alb_dns_name        # ALB DNS name (use for access)
terraform output alb_arn             # ALB ARN
terraform output alb_zone_id         # ALB Route53 zone ID
```

### ECS Outputs
```bash
terraform output ecs_cluster_name    # ECS cluster name
terraform output ecs_cluster_arn     # ECS cluster ARN
```

### ECR Outputs
```bash
terraform output ecr_repository_urls # Map of app -> ECR URL
```

### Example Usage
```bash
# Get ALB DNS name to access applications
ALB_DNS=$(terraform output -raw alb_dns_name)
echo "Access applications at: http://${ALB_DNS}"

# Get ECR URLs for pushing images
terraform output -json ecr_repository_urls | jq
```

## 🌍 Environments

The infrastructure supports multiple environments through variables:

### Development (dev)
```hcl
environment = "dev"
```
- Single NAT Gateway (cost optimization)
- FARGATE_SPOT for cost savings
- Minimal monitoring
- 7-day log retention
- No deletion protection

### Staging (staging)
```hcl
environment = "staging"
```
- Single NAT Gateway
- Mix of FARGATE and FARGATE_SPOT
- Full monitoring enabled
- 14-day log retention
- No deletion protection

### Production (prod)
```hcl
environment = "prod"
```
- NAT Gateway per AZ (high availability)
- FARGATE only (no spot)
- Full monitoring and alarms
- 30-day log retention
- Deletion protection enabled

### Switching Environments

```bash
# Method 1: Using workspace (if using HCP Terraform)
terraform workspace select prod
terraform apply

# Method 2: Using different tfvars files
terraform apply -var-file="environments/prod.tfvars"
```

## 💰 Cost Estimation

### Development Environment (~$50-100/month)
- VPC: Free
- NAT Gateway: ~$32/month
- ALB: ~$16/month
- ECS Fargate (minimal): ~$10-30/month
- CloudWatch Logs: ~$2/month

### Production Environment (~$200-500/month)
- VPC: Free
- NAT Gateways (3): ~$96/month
- ALB: ~$16/month
- ECS Fargate (scaled): ~$50-300/month
- CloudWatch Logs: ~$5-10/month
- CloudWatch Alarms: ~$1/month

**Note**: Costs vary based on:
- Number of running tasks
- Task CPU/memory allocation
- Data transfer
- Log volume
- Number of deployed applications

### Cost Optimization Tips

1. **Use development environment** for testing
2. **Enable FARGATE_SPOT** for non-production
3. **Right-size task resources** (CPU/memory)
4. **Reduce log retention** for development
5. **Scale down when not in use**
6. **Use single NAT Gateway** in dev

## 🔒 Security

### Best Practices Implemented

1. ✅ **Network Isolation**: Private subnets for application workloads
2. ✅ **Least Privilege IAM**: Minimal permissions for ECS tasks
3. ✅ **Security Groups**: Restrictive ingress rules
4. ✅ **Encryption**: 
   - S3 bucket encryption (AES256)
   - ECR image encryption
   - ECS task secrets encryption (via AWS Secrets Manager - configure separately)
5. ✅ **Image Scanning**: ECR automatic vulnerability scanning
6. ✅ **No Public IPs**: ECS tasks in private subnets
7. ✅ **Public Access Block**: S3 buckets blocked from public access
8. ✅ **VPC Flow Logs**: Enable for network traffic analysis (add if needed)

### Security Checklist

- [ ] Review and update security group rules
- [ ] Enable MFA for AWS account
- [ ] Use AWS Secrets Manager for sensitive data
- [ ] Enable AWS GuardDuty for threat detection
- [ ] Configure AWS Config for compliance
- [ ] Enable CloudTrail for audit logging
- [ ] Regularly update container images
- [ ] Review ECR scan results
- [ ] Implement Web Application Firewall (WAF) for ALB
- [ ] Use HTTPS/TLS for all traffic (configure ACM certificate)

### Secrets Management

**Never** commit sensitive data to version control:

```bash
# Add to .gitignore
echo "*.tfvars" >> .gitignore
echo ".terraform/" >> .gitignore
echo "terraform.tfstate*" >> .gitignore
```

Use environment variables or AWS Secrets Manager:
```bash
export TF_VAR_db_password="your-secure-password"
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Terraform Init Fails

**Error**: `Error: Failed to get existing workspaces`

**Solution**: 
```bash
# If using HCP Terraform, ensure you're logged in
terraform login

# Or use local backend temporarily
mv backend.tf backend.tf.disabled
terraform init
```

#### 2. AWS Credentials Not Found

**Error**: `Error: No valid credential sources found`

**Solution**:
```bash
# Configure AWS credentials
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_DEFAULT_REGION="us-east-1"
```

#### 3. Insufficient IAM Permissions

**Error**: `Error: creating ECS Cluster: AccessDeniedException`

**Solution**: Ensure your IAM user/role has required permissions. Use AWS managed policies:
- `PowerUserAccess` (for development)
- Custom policy with specific permissions (for production)

#### 4. Resource Already Exists

**Error**: `Error: creating S3 Bucket: BucketAlreadyExists`

**Solution**: 
```bash
# Change project_name or environment in terraform.tfvars
project_name = "ghcp-demo-unique"
```

#### 5. Plan Shows Unexpected Changes

**Error**: Resources show changes on every plan

**Solution**:
```bash
# Check for timestamp in locals.tf - remove if present in tags
# Ensure terraform.tfvars matches what was previously applied
terraform refresh
```

### Debug Mode

Enable detailed logging:
```bash
export TF_LOG=DEBUG
export TF_LOG_PATH=terraform-debug.log
terraform apply
```

### Getting Help

1. Check [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
2. Review [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
3. Search [Terraform Registry](https://registry.terraform.io/)
4. Check module documentation:
   - [VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)
   - [ALB Module](https://registry.terraform.io/modules/terraform-aws-modules/alb/aws/latest)

## 🧹 Cleanup

### Destroy Infrastructure

**Warning**: This will delete all resources and data. Ensure you have backups!

```bash
# Review what will be destroyed
terraform plan -destroy

# Destroy all resources
terraform destroy
```

### Manual Cleanup (if destroy fails)

1. **Empty S3 buckets**:
   ```bash
   aws s3 rm s3://your-bucket-name --recursive
   ```

2. **Delete ECR images**:
   ```bash
   aws ecr batch-delete-image \
     --repository-name ghcp-demo/java-springboot \
     --image-ids imageTag=latest
   ```

3. **Stop ECS tasks**:
   ```bash
   aws ecs update-service \
     --cluster ghcp-demo-dev-cluster \
     --service your-service \
     --desired-count 0
   ```

4. **Retry destroy**:
   ```bash
   terraform destroy
   ```

### Cleanup Checklist

- [ ] Export/backup any important data
- [ ] Remove all ECS services
- [ ] Delete ECR images
- [ ] Empty S3 buckets
- [ ] Run `terraform destroy`
- [ ] Verify in AWS Console all resources are deleted
- [ ] Check for orphaned resources (CloudWatch logs, etc.)

## 📚 Additional Resources

### Terraform Documentation
- [Terraform Language](https://developer.hashicorp.com/terraform/language)
- [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices)

### AWS Documentation
- [ECS on Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
- [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/)
- [ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/)
- [VPC Best Practices](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html)

### Related Repositories
- [Terraform AWS Modules](https://github.com/terraform-aws-modules)
- [AWS ECS Examples](https://github.com/aws-samples/ecs-refarch-continuous-deployment)

## 🤝 Contributing

To contribute to this infrastructure:

1. Create a feature branch
2. Make your changes
3. Run `terraform fmt` and `terraform validate`
4. Test in a development environment
5. Submit a pull request

## 📝 License

This project is part of the GitHub Copilot All-in-One Demo repository.

---

**Questions or Issues?** Open an issue in the [GitHub repository](https://github.com/your-org/ghcp-allinone-demo/issues).
