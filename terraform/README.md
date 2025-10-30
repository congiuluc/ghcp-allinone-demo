# 🏗️ Terraform - GitHub Copilot Code Completions Demo

Complete guide to demonstrate Copilot code completions for Terraform Infrastructure as Code.

## 🎯 Demo Overview

Demonstrate code completions for:
- Provider configuration
- Resource definitions
- Data sources
- Variable declarations
- Output values
- Module usage
- Locals and computed values

**Time needed:** 5-15 minutes

---

## 📋 Setup & Prerequisites

### Requirements
- Terraform 1.6.0+
- VS Code with GitHub Copilot extension
- (Optional) Cloud provider CLI (AWS CLI, Azure CLI, GCP SDK)
- (Optional) HCP Terraform account for remote state

### Verify Setup
```bash
terraform version    # Should show 1.6.0+
```

### Install Terraform
**macOS:**
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

**Linux:**
```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

**Windows:**
```powershell
choco install terraform
```

### Initialize & Validate
```bash
terraform init       # Initialize Terraform
terraform fmt        # Format code
terraform validate   # Validate configuration
terraform plan       # Preview changes
```

---

## 🎬 Demo Scenarios

### ⭐ SCENARIO 1: Provider Configuration (EASIEST - 1 min)

**File**: `providers.tf`  
**Starting point**: Empty provider block

**Demo:**
1. Type: `provider "aws" {`
2. Press Enter
3. Type: `region =`
4. Wait for grey suggestion
5. Copilot suggests: `var.aws_region` or `"us-east-1"`
6. Press Tab

**What's impressive:**
- Terraform HCL syntax
- Common provider patterns
- Variable references
- Region awareness

**Talk about:**
> "Copilot knows Terraform provider patterns. It suggests variable references and common configurations."

---

### ⭐⭐ SCENARIO 2: Resource with Tags (MEDIUM - 2 min)

**File**: `main.tf`  
**Starting point**: Empty resource block

**Type:**
```hcl
resource "aws_instance" "web" {
  ami           = 
  instance_type = 
  
  tags = {
```

**Copilot suggests:**
```hcl
ami           = data.aws_ami.ubuntu.id
instance_type = var.instance_type

tags = {
  Name        = "${var.project_name}-web"
  Environment = var.environment
  ManagedBy   = "Terraform"
}
```

**Impressive:**
- Data source references
- Variable interpolation
- Common tag patterns
- String interpolation syntax

---

### ⭐⭐⭐ SCENARIO 3: Module Usage (ADVANCED - 3 min)

**File**: `main.tf`  
**Starting point**: Module declaration

**Type:**
```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"
  
  name = 
  cidr = 
```

**Copilot suggests:**
- Module input variables
- CIDR block patterns
- Subnet configurations
- Availability zone handling

**Complex because:**
- Module parameter awareness
- Networking concepts
- AWS-specific patterns
- Version constraints

---

## 💡 Best Practices

### 1. Clear Resource Names
```hcl
# BAD - Unclear purpose
resource "aws_instance" "i" {
  ...
}

# GOOD - Descriptive name
resource "aws_instance" "web_server" {
  # Copilot now understands this is a web server
  ...
}
```

### 2. Use Variables for Flexibility
```hcl
# BAD - Hardcoded values
resource "aws_instance" "web" {
  instance_type = "t3.micro"
  ami           = "ami-12345"
}

# GOOD - Variables
resource "aws_instance" "web" {
  instance_type = var.instance_type
  ami           = data.aws_ami.ubuntu.id
}
```

### 3. Descriptive Variable Definitions
```hcl
variable "instance_type" {
  description = "EC2 instance type for web servers"
  type        = string
  default     = "t3.micro"
  
  validation {
    condition     = contains(["t3.micro", "t3.small", "t3.medium"], var.instance_type)
    error_message = "Instance type must be t3.micro, t3.small, or t3.medium."
  }
}
```

### 4. Use Locals for Computed Values
```hcl
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
  
  # Copilot understands computed values
  instance_name = "${var.project_name}-${var.environment}-web"
}
```

---

## 🆕 DEMO: Creating Infrastructure from Scratch (8 min)

### Part A: Network Infrastructure

**File**: `network.tf`

**Step 1: VPC Definition**
```hcl
Type:  resource "aws_vpc" "main" {
         cidr_block           = 
         enable_dns_hostnames = 
         enable_dns_support   = 
```
- Copilot suggests CIDR blocks
- Boolean values
- Common VPC settings

**Step 2: Subnets**
```hcl
Type:  resource "aws_subnet" "public" {
         vpc_id                  = aws_vpc.main.id
         cidr_block              = 
         availability_zone       = 
         map_public_ip_on_launch = 
```
- Copilot suggests subnet CIDR
- AZ references
- Public subnet patterns

**Step 3: Internet Gateway**
```hcl
Type:  resource "aws_internet_gateway" "main" {
         vpc_id = 
         
         tags = {
```
- VPC reference
- Tag patterns

### Part B: Compute Resources

**File**: `compute.tf`

**Step 1: Security Group**
```hcl
Type:  resource "aws_security_group" "web" {
         name        = 
         description = 
         vpc_id      = 
         
         ingress {
           from_port   = 80
           to_port     = 80
           protocol    = 
           cidr_blocks = 
```
- Copilot suggests security group rules
- Common ports (80, 443, 22)
- CIDR patterns

**Step 2: EC2 Instance**
```hcl
Type:  resource "aws_instance" "web" {
         ami                    = 
         instance_type          = 
         subnet_id              = 
         vpc_security_group_ids = 
         
         user_data = <<-EOF
           #!/bin/bash
```
- AMI references
- Subnet/SG links
- User data script

### Part C: Outputs

**File**: `outputs.tf`

```hcl
Type:  output "instance_public_ip" {
         description = 
         value       = 
       }
       
       output "vpc_id" {
         description = 
         value       = 
```
- Copilot suggests output values
- Description patterns
- Resource references

---

## 📝 Spec-Driven Example

### Demo: Create from comments

**Step 1: Write the specification**
```hcl
# Create a highly available web application with:
# - VPC with public and private subnets across 2 AZs
# - Application Load Balancer in public subnets
# - Auto Scaling Group in private subnets
# - RDS database in private subnets
# - CloudWatch alarms for monitoring

# DEMO TODO: Let Copilot implement based on spec
```

**Step 2: Start typing**
```hcl
resource "aws_vpc" "main" {
```

**Copilot now knows from comments:**
- Multi-AZ architecture
- Public/private subnet split
- ALB + ASG pattern
- RDS integration
- Monitoring needs

**Teaching point:**
> "Comments guide Copilot. Describe your architecture first, then implement. Copilot reads context."

---

## 🎯 Advanced Demo: Dynamic Blocks (4 min)

### Dynamic Security Group Rules

**File**: `security.tf`

**Step 1: Define variable**
```hcl
Type:  variable "ingress_rules" {
         description = "List of ingress rules"
         type = list(object({
           from_port   = number
           to_port     = number
           protocol    = string
           cidr_blocks = list(string)
         }))
```

**Step 2: Dynamic block**
```hcl
Type:  resource "aws_security_group" "dynamic" {
         name = "dynamic-sg"
         
         dynamic "ingress" {
           for_each = var.ingress_rules
           content {
             from_port   = 
             to_port     = 
             protocol    = 
             cidr_blocks = 
```
- Copilot suggests `ingress.value.from_port`
- Dynamic iteration patterns
- Object attribute access

---

## 🚀 Full Demo Script (15 minutes)

### Opening (1 min)
> "Terraform is declarative infrastructure as code. Copilot understands HCL syntax and cloud provider patterns. Watch how it helps build infrastructure."

### Demo 1 - Provider Setup (2 min)
- Open `providers.tf`
- Configure AWS provider
- Show region suggestions
- Explain provider versioning

### Demo 2 - Basic Resources (3 min)
- Open `main.tf`
- Create VPC resource
- Show CIDR suggestions
- Add tags with variables

### Demo 3 - Data Sources (2 min)
- Add data source for AMI
- Show filter suggestions
- Reference in resource

### Demo 4 - Variables & Outputs (3 min)
- Define input variables
- Show validation blocks
- Create outputs
- Show value suggestions

### Demo 5 - Module Usage (2 min)
- Add community module
- Show parameter suggestions
- Explain module benefits

### Run & Validate (2 min)
```bash
terraform init
terraform fmt
terraform validate
terraform plan
```

---

## 🎯 Key Teaching Points

### Terraform Specific
✅ HCL syntax patterns  
✅ Resource dependencies  
✅ Variable interpolation  
✅ Data source usage  
✅ Module composition  

### Code Completions Work Best For
⭐ Resource configurations  
⭐ Variable definitions  
⭐ Common cloud patterns  
⭐ Tag structures  
⭐ Output declarations  

---

## ✅ Pre-Demo Checklist

- [ ] Terraform 1.6.0+ installed
- [ ] Copilot connected
- [ ] Cloud provider CLI configured (optional)
- [ ] Font size increased
- [ ] Dark theme enabled
- [ ] TODO comments in place
- [ ] Terminal ready

---

## 🐛 Troubleshooting

### Copilot not suggesting?
- Wait 1-2 seconds after typing
- Type more context (resource type, attributes)
- Check Copilot status bar
- Reload VS Code window

### Terraform init fails?
```bash
# Clear cache and retry
rm -rf .terraform .terraform.lock.hcl
terraform init
```

### Validation errors?
```bash
# Format code first
terraform fmt

# Then validate
terraform validate
```

### Syntax highlighting issues?
- Install "HashiCorp Terraform" extension
- Reload VS Code
- Check file extension is `.tf`

---

## 📚 Common Patterns to Demo

### 1. Count and For Each
```hcl
# Create multiple subnets
resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)
  
  vpc_id     = aws_vpc.main.id
  cidr_block = var.private_subnet_cidrs[count.index]
  
  # Copilot suggests count.index usage
  tags = {
    Name = "private-subnet-${count.index + 1}"
  }
}
```

### 2. Conditional Resources
```hcl
# Create NAT Gateway only in production
resource "aws_nat_gateway" "main" {
  count = var.environment == "prod" ? var.az_count : 0
  
  # Copilot understands conditional logic
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
}
```

### 3. Data Source Filtering
```hcl
# Find latest Amazon Linux AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
  
  # Copilot suggests common filter patterns
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
```

---

## 🔐 Security Best Practices

### Never Hardcode Secrets
```hcl
# BAD - Secrets in code
resource "aws_db_instance" "main" {
  password = "mysecretpassword"  # DON'T DO THIS
}

# GOOD - Use variables marked as sensitive
variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

resource "aws_db_instance" "main" {
  password = var.db_password
}
```

### Use Remote State
```hcl
# Store state in HCP Terraform or S3
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}
```

---

## 📖 Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [HCP Terraform](https://app.terraform.io/)
- [Terraform Registry](https://registry.terraform.io/)
- [AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Azure Provider Docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [GCP Provider Docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs)

---

## 🎓 Next Steps

After this demo, explore:
- Terraform modules for reusability
- Terraform Cloud for team collaboration
- Policy as Code with Sentinel
- Automated testing with Terratest
- GitOps workflows with Terraform
