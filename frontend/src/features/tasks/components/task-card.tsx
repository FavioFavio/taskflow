import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TaskDeleteDialog } from "@/features/tasks/components/task-delete-dialog";
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog";
import { TaskStatusToggle } from "@/features/tasks/components/task-status-toggle";
import type { Task } from "@/features/tasks/types/task";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/features/tasks/utils/task-labels";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-normal break-words">
              {task.title}
            </h3>
            <CardDescription>
              {TASK_STATUS_LABELS[task.status]} · Prioridad{" "}
              {TASK_PRIORITY_LABELS[task.priority].toLowerCase()}
            </CardDescription>
          </div>
          <TaskStatusToggle taskId={task.id} status={task.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-6">
          {task.description ?? "Sin descripción."}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <TaskFormDialog task={task} />
          <TaskDeleteDialog taskId={task.id} />
        </div>
      </CardContent>
    </Card>
  );
}
