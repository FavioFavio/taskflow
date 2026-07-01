import type { Task } from "@/features/tasks/types/task";
import type { TaskStats } from "@/features/tasks/types/task-stats";

export function getTaskStats(tasks: Task[]): TaskStats {
  return tasks.reduce<TaskStats>(
    (stats, task) => {
      stats.totalTasks += 1;

      if (task.status === "Todo") {
        stats.pendingTasks += 1;
      }

      if (task.status === "In Progress") {
        stats.inProgressTasks += 1;
      }

      if (task.status === "Done") {
        stats.completedTasks += 1;
      }

      return stats;
    },
    {
      completedTasks: 0,
      inProgressTasks: 0,
      pendingTasks: 0,
      totalTasks: 0,
    },
  );
}
