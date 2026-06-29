import type { TaskPriority, TaskStatus } from "@/features/tasks/types/task";

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  Low: "Baja",
  Medium: "Media",
  High: "Alta",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  Todo: "Pendiente",
  "In Progress": "En proceso",
  Done: "Completada",
};
