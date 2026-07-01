import { describe, expect, it } from "vitest";

import type { Task } from "@/features/tasks/types/task";
import { getTaskStats } from "@/features/tasks/utils/task-stats";

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Preparar entrega",
    description: null,
    priority: "High",
    status: "Todo",
    dueDate: null,
    completedAt: null,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Revisar diseño",
    description: null,
    priority: "Medium",
    status: "In Progress",
    dueDate: null,
    completedAt: null,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Enviar resumen",
    description: null,
    priority: "Low",
    status: "Done",
    dueDate: null,
    completedAt: "2026-06-29T12:30:00.000Z",
    createdAt: "2026-06-28T00:00:00.000Z",
  },
];

describe("getTaskStats", () => {
  it("calculates task counters from an existing task list", () => {
    expect(getTaskStats(tasks)).toEqual({
      completedTasks: 1,
      inProgressTasks: 1,
      pendingTasks: 1,
      totalTasks: 3,
    });
  });

  it("returns zero values for an empty task list", () => {
    expect(getTaskStats([])).toEqual({
      completedTasks: 0,
      inProgressTasks: 0,
      pendingTasks: 0,
      totalTasks: 0,
    });
  });
});
