import {
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/features/tasks/types/task";

export type TaskBoardColumn = {
  status: TaskStatus;
  tasks: Task[];
};

const TASK_PRIORITY_ORDER: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

function sortTasksForBoard(tasks: Task[]) {
  return [...tasks].sort((firstTask, secondTask) => {
    const priorityOrder =
      TASK_PRIORITY_ORDER[firstTask.priority] -
      TASK_PRIORITY_ORDER[secondTask.priority];

    if (priorityOrder !== 0) {
      return priorityOrder;
    }

    const createdAtOrder =
      new Date(secondTask.createdAt).getTime() -
      new Date(firstTask.createdAt).getTime();

    if (createdAtOrder !== 0) {
      return createdAtOrder;
    }

    return firstTask.title.localeCompare(secondTask.title, "es");
  });
}

export function groupTasksByStatus(tasks: Task[]): TaskBoardColumn[] {
  return TASK_STATUSES.map((status) => ({
    status,
    tasks: sortTasksForBoard(tasks.filter((task) => task.status === status)),
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
