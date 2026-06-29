import {
  TASK_PRIORITIES,
  type Task,
  type TaskPriority,
} from "@/features/tasks/types/task";
import { TASK_PRIORITY_LABELS } from "@/features/tasks/utils/task-labels";

export const TASK_STATUS_FILTERS = ["all", "pending", "completed"] as const;
export type TaskStatusFilter = (typeof TASK_STATUS_FILTERS)[number];

export type TaskPriorityFilter = TaskPriority | "all";
export const TASK_PRIORITY_FILTERS = ["all", ...TASK_PRIORITIES] as const;

export type TaskFilters = {
  priority: TaskPriorityFilter;
  search: string;
  status: TaskStatusFilter;
};

export const DEFAULT_TASK_FILTERS: TaskFilters = {
  priority: "all",
  search: "",
  status: "all",
};

export const TASK_STATUS_FILTER_LABELS: Record<TaskStatusFilter, string> = {
  all: "Todas",
  pending: "Pendientes",
  completed: "Completadas",
};

export const TASK_PRIORITY_FILTER_LABELS: Record<TaskPriorityFilter, string> = {
  all: "Todas",
  ...TASK_PRIORITY_LABELS,
};

export function isTaskStatusFilter(value: string): value is TaskStatusFilter {
  return (TASK_STATUS_FILTERS as readonly string[]).includes(value);
}

export function isTaskPriorityFilter(
  value: string,
): value is TaskPriorityFilter {
  return (TASK_PRIORITY_FILTERS as readonly string[]).includes(value);
}

export function filterTasks(tasks: Task[], filters: TaskFilters) {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      task.title.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "completed" && task.status === "Done") ||
      (filters.status === "pending" && task.status !== "Done");
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function hasActiveTaskFilters(filters: TaskFilters) {
  return (
    filters.search.trim().length > 0 ||
    filters.status !== "all" ||
    filters.priority !== "all"
  );
}
