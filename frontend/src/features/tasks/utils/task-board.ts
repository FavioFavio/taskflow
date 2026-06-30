import {
  TASK_STATUSES,
  type Task,
  type TaskStatus,
} from "@/features/tasks/types/task";

export type TaskBoardColumn = {
  status: TaskStatus;
  tasks: Task[];
};

export function groupTasksByStatus(tasks: Task[]): TaskBoardColumn[] {
  return TASK_STATUSES.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));
}

export function moveTaskToStatus(
  tasks: Task[],
  taskId: string,
  status: TaskStatus,
  completedAt = new Date().toISOString(),
) {
  let moved = false;

  const nextTasks = tasks.map((task) => {
    if (task.id !== taskId || task.status === status) {
      return task;
    }

    moved = true;

    return {
      ...task,
      status,
      completedAt: status === "Done" ? completedAt : null,
    };
  });

  return moved ? nextTasks : tasks;
}
