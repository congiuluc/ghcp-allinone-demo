# ECS Service Module - Main Configuration
# This module creates an ECS service with task definition and target group

#------------------------------------------------------------------------------
# Task Definition
#------------------------------------------------------------------------------

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-${var.environment}-${var.app_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions = jsonencode([
    {
      name      = var.app_name
      image     = var.container_image
      essential = true

      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]

      environment = var.environment_variables

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = var.log_group_name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = var.app_name
        }
      }

      healthCheck = var.health_check_command != "" ? {
        command     = ["CMD-SHELL", var.health_check_command]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      } : null
    }
  ])

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${var.environment}-${var.app_name}-task"
      Application = var.app_name
      Environment = var.environment
    }
  )
}

#------------------------------------------------------------------------------
# Target Group
#------------------------------------------------------------------------------

resource "aws_lb_target_group" "app" {
  name_prefix = substr("${var.app_name}-", 0, 6)
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = var.health_check_healthy_threshold
    unhealthy_threshold = var.health_check_unhealthy_threshold
    timeout             = var.health_check_timeout
    interval            = var.health_check_interval
    path                = var.health_check_path
    matcher             = var.health_check_matcher
  }

  deregistration_delay = 30

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${var.environment}-${var.app_name}-tg"
      Application = var.app_name
      Environment = var.environment
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

#------------------------------------------------------------------------------
# Listener Rule
#------------------------------------------------------------------------------

resource "aws_lb_listener_rule" "app" {
  listener_arn = var.listener_arn
  priority     = var.listener_rule_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  condition {
    path_pattern {
      values = var.path_patterns
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${var.environment}-${var.app_name}-rule"
      Application = var.app_name
      Environment = var.environment
    }
  )
}

#------------------------------------------------------------------------------
# ECS Service
#------------------------------------------------------------------------------

resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-${var.environment}-${var.app_name}"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
  launch_type     = var.launch_type

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [var.security_group_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = var.app_name
    container_port   = var.container_port
  }

  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  enable_execute_command = var.enable_execute_command

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${var.environment}-${var.app_name}-service"
      Application = var.app_name
      Environment = var.environment
    }
  )

  depends_on = [aws_lb_listener_rule.app]

  lifecycle {
    ignore_changes = [desired_count]
  }
}

#------------------------------------------------------------------------------
# Auto Scaling
#------------------------------------------------------------------------------

resource "aws_appautoscaling_target" "app" {
  count = var.enable_autoscaling ? 1 : 0

  max_capacity       = var.autoscaling_max_capacity
  min_capacity       = var.autoscaling_min_capacity
  resource_id        = "service/${var.ecs_cluster_name}/${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "cpu" {
  count = var.enable_autoscaling ? 1 : 0

  name               = "${var.project_name}-${var.environment}-${var.app_name}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.app[0].resource_id
  scalable_dimension = aws_appautoscaling_target.app[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.app[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = var.autoscaling_cpu_target
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_policy" "memory" {
  count = var.enable_autoscaling ? 1 : 0

  name               = "${var.project_name}-${var.environment}-${var.app_name}-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.app[0].resource_id
  scalable_dimension = aws_appautoscaling_target.app[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.app[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = var.autoscaling_memory_target
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}
