import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Flag,
  Timer,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { TaskPriority, TaskStatus } from "@/features/tasks/types/task";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/features/tasks/utils/task-labels";

type BadgeVariant = "default" | "destructive" | "success" | "warning";

type BadgeConfig = {
  icon: LucideIcon;
  variant: BadgeVariant;
};

const STATUS_BADGE_CONFIG: Record<TaskStatus, BadgeConfig> = {
  Todo: {
    icon: CircleDashed,
    variant: "warning",
  },
  "In Progress": {
    icon: Timer,
    variant: "default",
  },
  Done: {
    icon: CheckCircle2,
    variant: "success",
  },
};

const PRIORITY_BADGE_CONFIG: Record<
  TaskPriority,
  BadgeConfig & {
    cardClassName: string;
  }
> = {
  Low: {
    cardClassName:
      "border-l-success/70 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--success),transparent_92%)_100%)] hover:border-l-success",
    icon: Flag,
    variant: "success",
  },
  Medium: {
    cardClassName:
      "border-l-warning/80 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--warning),transparent_88%)_100%)] hover:border-l-warning",
    icon: Flag,
    variant: "warning",
  },
  High: {
    cardClassName:
      "border-l-destructive/80 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--destructive),transparent_91%)_100%)] hover:border-l-destructive",
    icon: AlertTriangle,
    variant: "destructive",
  },
};

export function getTaskPriorityCardClassName(priority: TaskPriority) {
  return PRIORITY_BADGE_CONFIG[priority].cardClassName;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = STATUS_BADGE_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant}>
      <Icon className="size-3.5" aria-hidden="true" />
      {TASK_STATUS_LABELS[status]}
    </Badge>
  );
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = PRIORITY_BADGE_CONFIG[priority];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant}>
      <Icon className="size-3.5" aria-hidden="true" />
      Prioridad {TASK_PRIORITY_LABELS[priority].toLowerCase()}
    </Badge>
  );
}
