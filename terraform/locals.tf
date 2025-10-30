# Local Values for GitHub Copilot All-in-One Demo Infrastructure
# These local values are computed and reused throughout the configuration

locals {
  # Common name prefix for all resources
  name_prefix = "${var.project_name}-${var.environment}"

  # Application port mappings for different frameworks
  application_ports = {
    "java-springboot"    = 8080
    "dotnet-aspnetcore"  = 5000
    "python-flask"       = 5000
    "typescript-express" = 3000
    "react-app"          = 3000
    "angular-app"        = 4200
    "cobol-app"          = 8080
  }

  # Environment-specific configuration
  environment_config = {
    dev = {
      enable_deletion_protection = false
      enable_monitoring          = false
      use_spot_instances         = true
      min_capacity               = 1
      max_capacity               = 2
    }
    staging = {
      enable_deletion_protection = false
      enable_monitoring          = true
      use_spot_instances         = true
      min_capacity               = 1
      max_capacity               = 3
    }
    prod = {
      enable_deletion_protection = true
      enable_monitoring          = true
      use_spot_instances         = false
      min_capacity               = 2
      max_capacity               = 10
    }
  }

  # Get current environment config
  current_env_config = local.environment_config[var.environment]

  # Resource tags with computed values
  resource_tags = merge(
    var.common_tags,
    {
      Environment = var.environment
      Terraform   = "true"
      CreatedDate = timestamp()
    }
  )
}
