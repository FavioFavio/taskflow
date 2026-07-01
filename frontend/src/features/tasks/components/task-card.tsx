import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getTaskPriorityCardClassName,
  TaskPriorityBadge,
  TaskStatusBadge,
} from "@/features/tasks/components/task-badges";
import { TaskDeleteDialog } from "@/features/tasks/components/task-delete-dialog";
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog";
import { TaskStatusToggle } from "@/features/tasks/components/task-status-toggle";
import type { Task } from "@/features/tasks/types/task";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
};

function formatCompletedAt(value: string) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeZone: "America/Buenos_Aires",
    timeStyle: "short",
  }).format(new Date(value));
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      className={cn(
        "hover:border-primary/30 overflow-hidden border-l-4 transition-colors",
        getTaskPriorityCardClassName(task.priority),
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <h3 className="text-xl font-semibold tracking-normal break-words">
              {task.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <TaskStatusBadge status={task.status} />
              <TaskPriorityBadge priority={task.priority} />
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
