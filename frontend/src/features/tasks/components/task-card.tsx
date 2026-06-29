import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Flag,
  Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TaskDeleteDialog } from "@/features/tasks/components/task-delete-dialog";
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog";
import { TaskStatusToggle } from "@/features/tasks/components/task-status-toggle";
import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks/types/task";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/features/tasks/utils/task-labels";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
};

const STATUS_BADGE_CONFIG: Record<
  TaskStatus,
  {
    icon: typeof CircleDashed;
    variant: "default" | "secondary" | "success" | "warning";
  }
> = {
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
  {
    icon: typeof Flag;
    cardClassName: string;
    variant: "destructive" | "success" | "warning";
  }
> = {
  Low: {
    icon: Flag,
    cardClassName:
      "border-l-success/70 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--success),transparent_92%)_100%)] hover:border-l-success",
    variant: "success",
  },
  Medium: {
    icon: Flag,
    cardClassName:
      "border-l-warning/80 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--warning),transparent_88%)_100%)] hover:border-l-warning",
    variant: "warning",
  },
  High: {
    icon: AlertTriangle,
    cardClassName:
      "border-l-destructive/80 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--destructive),transparent_91%)_100%)] hover:border-l-destructive",
    variant: "destructive",
  },
};

function formatCompletedAt(value: string) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export function TaskCard({ task }: TaskCardProps) {
  const StatusIcon = STATUS_BADGE_CONFIG[task.status].icon;
  const PriorityIcon = PRIORITY_BADGE_CONFIG[task.priority].icon;

  return (
    <Card
      className={cn(
        "hover:border-primary/30 overflow-hidden border-l-4 transition-colors",
        PRIORITY_BADGE_CONFIG[task.priority].cardClassName,
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <h3 className="text-xl font-semibold tracking-normal break-words">
              {task.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant={STATUS_BADGE_CONFIG[task.status].variant}>
                <StatusIcon className="size-3.5" aria-hidden="true" />
                {TASK_STATUS_LABELS[task.status]}
              </Badge>
              <Badge variant={PRIORITY_BADGE_CONFIG[task.priority].variant}>
                <PriorityIcon className="size-3.5" aria-hidden="true" />
                Prioridad {TASK_PRIORITY_LABELS[task.priority].toLowerCase()}
              </Badge>
            </div>
          </div>
          <TaskStatusToggle taskId={task.id} status={task.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-6">
          {task.description ?? "Sin descripción."}
        </p>
        {task.completedAt ? (
          <p className="text-muted-foreground text-sm">
            Completada el {formatCompletedAt(task.completedAt)}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <TaskFormDialog task={task} />
          <TaskDeleteDialog taskId={task.id} />
        </div>
      </CardContent>
    </Card>
  );
}
