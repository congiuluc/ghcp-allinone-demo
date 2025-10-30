# Deployment Guide

This guide walks you through deploying the GitHub Copilot All-in-One Demo infrastructure and applications.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Infrastructure Deployment](#phase-1-infrastructure-deployment)
3. [Phase 2: Container Image Preparation](#phase-2-container-image-preparation)
4. [Phase 3: Application Deployment](#phase-3-application-deployment)
5. [Phase 4: Verification](#phase-4-verification)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- [x] AWS account with appropriate permissions
- [x] AWS CLI configured (`aws configure`)
- [x] Terraform >= 1.6.0 installed
- [x] Docker installed and running
- [x] Git installed
- [x] HCP Terraform account (optional, recommended)

## Phase 1: Infrastructure Deployment

### Step 1: Configure Terraform

```bash
# Navigate to terraform directory
cd terraform

# Copy example configuration
cp terraform.tfvars.example terraform.tfvars

# Edit configuration
vim terraform.tfvars
```

**Minimum changes required in `terraform.tfvars`:**
```hcl
aws_region   = "us-east-1"  # Your preferred region
environment  = "dev"         # dev, staging, or prod
project_name = "ghcp-demo"   # Your project name
```

### Step 2: Configure Backend (Optional but Recommended)

If using HCP Terraform:

```bash
# Edit backend.tf
vim backend.tf
```

Update organization name:
```hcl
terraform {
  cloud {
    organization = "your-actual-org-name"  # Change this!
    workspaces {
      name = "ghcp-allinone-demo"
    }
  }
}
```

If NOT using HCP Terraform:
```bash
# Disable cloud backend
mv backend.tf backend.tf.disabled
```

### Step 3: Initialize Terraform

```bash
terraform init
```

Expected output:
```
Initializing modules...
Initializing the backend...
Initializing provider plugins...
Terraform has been successfully initialized!
```

### Step 4: Validate Configuration

```bash
# Check syntax
terraform validate

# Format code
terraform fmt -recursive

# Review planned changes
terraform plan
```

### Step 5: Deploy Infrastructure

```bash
# Deploy (takes ~5-10 minutes)
terraform apply

# When prompted, review the plan and type: yes
```

**What gets created:**
- VPC with public and private subnets across 3 AZs
- NAT Gateway(s) for internet access
- Application Load Balancer (ALB)
- ECS Fargate cluster
- ECR repositories (7 total, one per app)
- CloudWatch log groups
- IAM roles and policies
- S3 bucket for static assets
- Security groups

### Step 6: Save Outputs

```bash
# View all outputs
terraform output

# Save important values
export ALB_DNS=$(terraform output -raw alb_dns_name)
export ECS_CLUSTER=$(terraform output -raw ecs_cluster_name)

# Save ECR URLs to a file
terraform output -json ecr_repository_urls > ecr-repos.json
cat ecr-repos.json
```

## Phase 2: Container Image Preparation

### Step 1: Prepare Dockerfiles

Each application directory needs a Dockerfile. Examples:

**Java Spring Boot** (`../java/Dockerfile`):
```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Python Flask** (`../python/Dockerfile`):
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

**React** (`../react/Dockerfile`):
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Build Application Artifacts

```bash
# Java
cd ../java
mvn clean package
cd ../terraform

# Python (no build needed)

# React
cd ../react
npm install
npm run build
cd ../terraform

# .NET
cd ../dotnet
dotnet publish -c Release
cd ../terraform
```

### Step 3: Authenticate with ECR

```bash
# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(terraform output -raw aws_region || echo "us-east-1")

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
```

### Step 4: Build and Push Container Images

**Java Spring Boot:**
```bash
cd ../java

# Get ECR URL from terraform output
ECR_URL=$(cd ../terraform && terraform output -json ecr_repository_urls | jq -r '."java-springboot"')

# Build image
docker build -t ghcp-demo/java-springboot:latest .

# Tag for ECR
docker tag ghcp-demo/java-springboot:latest ${ECR_URL}:latest
docker tag ghcp-demo/java-springboot:latest ${ECR_URL}:v1.0.0

# Push to ECR
docker push ${ECR_URL}:latest
docker push ${ECR_URL}:v1.0.0

cd ../terraform
```

**Python Flask:**
```bash
cd ../python

ECR_URL=$(cd ../terraform && terraform output -json ecr_repository_urls | jq -r '."python-flask"')

docker build -t ghcp-demo/python-flask:latest .
docker tag ghcp-demo/python-flask:latest ${ECR_URL}:latest
docker push ${ECR_URL}:latest

cd ../terraform
```

**React:**
```bash
cd ../react

ECR_URL=$(cd ../terraform && terraform output -json ecr_repository_urls | jq -r '."react-app"')

docker build -t ghcp-demo/react-app:latest .
docker tag ghcp-demo/react-app:latest ${ECR_URL}:latest
docker push ${ECR_URL}:latest

cd ../terraform
```

**Repeat for other applications** (TypeScript, Angular, .NET, COBOL)

### Step 5: Verify Images

```bash
# List images in ECR
aws ecr list-images --repository-name ghcp-demo/java-springboot
aws ecr list-images --repository-name ghcp-demo/python-flask
aws ecr list-images --repository-name ghcp-demo/react-app
```

## Phase 3: Application Deployment

### Option A: Using AWS Console (Quick Start)

1. Navigate to ECS in AWS Console
2. Click on your cluster: `ghcp-demo-dev-cluster`
3. Click "Create Service"
4. Configure:
   - Launch type: Fargate
   - Task Definition: Create new
   - Service name: `ghcp-demo-dev-java-springboot`
   - Number of tasks: 2
   - Load balancer: Use existing ALB
   - Target group: Create new or use existing

### Option B: Using Terraform Module (Recommended)

1. **Create service configuration file:**

```bash
# Copy example
cp examples/deploy-services.tf.example services.tf

# Uncomment and edit the Java service module
vim services.tf
```

2. **Edit the Java service section:**
```hcl
module "java_springboot_service" {
  source = "./modules/ecs-service"

  # Application Configuration
  app_name        = "java-springboot"
  container_image = "${module.ecr_repository_urls["java-springboot"]}:latest"
  container_port  = 8080

  cpu    = 512
  memory = 1024

  desired_count = 2

  # Health Check
  health_check_path = "/actuator/health"
  
  # Routing
  listener_rule_priority = 100
  path_patterns          = ["/api/java/*"]

  # Reference outputs from main infrastructure
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnets
  # ... (continue with other required variables)
}
```

3. **Deploy service:**
```bash
terraform plan
terraform apply
```

### Option C: Using AWS CLI

```bash
# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster ghcp-demo-dev-cluster \
  --service-name java-springboot \
  --task-definition ghcp-demo-java-springboot:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=DISABLED}"
```

## Phase 4: Verification

### Step 1: Check ECS Services

```bash
# List services
aws ecs list-services --cluster ghcp-demo-dev-cluster

# Describe service
aws ecs describe-services \
  --cluster ghcp-demo-dev-cluster \
  --services java-springboot
```

### Step 2: Check Task Status

```bash
# List running tasks
aws ecs list-tasks --cluster ghcp-demo-dev-cluster

# Describe task
aws ecs describe-tasks \
  --cluster ghcp-demo-dev-cluster \
  --tasks <task-arn>
```

### Step 3: Check Logs

```bash
# View logs (if task is running)
aws logs tail /ecs/ghcp-demo/dev/java-springboot --follow

# Or use AWS Console:
# CloudWatch → Log Groups → /ecs/ghcp-demo/dev/java-springboot
```

### Step 4: Test Applications

```bash
# Get ALB DNS
ALB_DNS=$(terraform output -raw alb_dns_name)

# Test Java app
curl http://${ALB_DNS}/api/java/health

# Test Python app
curl http://${ALB_DNS}/api/python/health

# Test React app
curl http://${ALB_DNS}/app/react/

# Open in browser
echo "Open in browser: http://${ALB_DNS}"
```

### Step 5: Monitor Health

```bash
# Check target health
aws elbv2 describe-target-health \
  --target-group-arn <target-group-arn>

# Check CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name CPUUtilization \
  --dimensions Name=ClusterName,Value=ghcp-demo-dev-cluster \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-01T23:59:59Z \
  --period 3600 \
  --statistics Average
```

## Troubleshooting

### Issue: Tasks Keep Stopping

**Possible causes:**
1. Application crashes on startup
2. Health check failures
3. Insufficient resources

**Solutions:**
```bash
# Check stopped task reason
aws ecs describe-tasks \
  --cluster ghcp-demo-dev-cluster \
  --tasks <stopped-task-arn> \
  --query 'tasks[0].stoppedReason'

# Check logs for errors
aws logs tail /ecs/ghcp-demo/dev/java-springboot --since 1h

# Increase CPU/memory in task definition
```

### Issue: Can't Access Application via ALB

**Possible causes:**
1. Listener rules not configured
2. Target group unhealthy
3. Security group blocking traffic

**Solutions:**
```bash
# Check listener rules
aws elbv2 describe-rules --listener-arn <listener-arn>

# Check target health
aws elbv2 describe-target-health --target-group-arn <tg-arn>

# Check security groups
aws ec2 describe-security-groups --group-ids <sg-id>
```

### Issue: Container Image Pull Failed

**Possible causes:**
1. ECR authentication expired
2. Image doesn't exist
3. Task execution role lacks permissions

**Solutions:**
```bash
# Re-authenticate
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <ecr-url>

# Verify image exists
aws ecr describe-images --repository-name ghcp-demo/java-springboot

# Check task execution role permissions
aws iam get-role --role-name ghcp-demo-dev-ecs-exec-role
```

### Issue: High Costs

**Solutions:**
```bash
# Scale down services
aws ecs update-service \
  --cluster ghcp-demo-dev-cluster \
  --service java-springboot \
  --desired-count 1

# Use FARGATE_SPOT for dev
# Switch to smaller task sizes (256 CPU / 512 MB)
# Delete unused resources: terraform destroy
```

## Next Steps

1. **Add HTTPS**: Configure ACM certificate and HTTPS listener
2. **Custom Domain**: Set up Route53 for custom domain
3. **CI/CD**: Integrate with GitHub Actions for automated deployments
4. **Monitoring**: Set up CloudWatch dashboards and alarms
5. **Auto Scaling**: Enable auto-scaling based on load
6. **Blue/Green Deployments**: Implement deployment strategies

## Useful Commands

```bash
# Quick status check
aws ecs describe-clusters --clusters ghcp-demo-dev-cluster

# Restart service (force new deployment)
aws ecs update-service \
  --cluster ghcp-demo-dev-cluster \
  --service java-springboot \
  --force-new-deployment

# Scale service
aws ecs update-service \
  --cluster ghcp-demo-dev-cluster \
  --service java-springboot \
  --desired-count 3

# View recent logs
aws logs tail /ecs/ghcp-demo/dev/java-springboot --since 5m

# Execute command in running container (for debugging)
aws ecs execute-command \
  --cluster ghcp-demo-dev-cluster \
  --task <task-id> \
  --container java-springboot \
  --interactive \
  --command "/bin/sh"
```

## Clean Up

To delete all resources:

```bash
# Stop all ECS services first
aws ecs update-service --cluster ghcp-demo-dev-cluster --service java-springboot --desired-count 0
aws ecs delete-service --cluster ghcp-demo-dev-cluster --service java-springboot

# Destroy infrastructure
terraform destroy
```

**WARNING**: This will delete all resources including data. Make sure to backup any important information first!
