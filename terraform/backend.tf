# Backend Configuration for HCP Terraform
# This configures remote state storage in HCP Terraform (Terraform Cloud)

terraform {
  cloud {
    organization = "your-hcp-terraform-org" # Replace with your HCP Terraform organization name

    workspaces {
      name = "ghcp-allinone-demo" # Workspace name matching the repository
    }
  }
}
