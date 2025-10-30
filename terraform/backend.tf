terraform {
  cloud {
    organization = "your-org-name"  # DEMO TODO: Replace with your HCP Terraform organization name

    workspaces {
      name = "ghcp-allinone-demo"  # DEMO TODO: Replace with your workspace name
    }
  }
}
