import { describe, expect, it } from "vitest";

import type { Task } from "@/features/tasks/types/task";
import {
  groupTasksByStatus,
  moveTaskToStatus,
} from "@/features/tasks/utils/task-board";

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

describe("groupTasksByStatus", () => {
  it("groups tasks by the existing task statuses", () => {
    const columns = groupTasksByStatus(tasks);

    expect(columns).toEqual([
      { status: "Todo", tasks: [tasks[0]] },
      { status: "In Progress", tasks: [tasks[1]] },
      { status: "Done", tasks: [tasks[2]] },
    ]);
  });

  it("keeps empty columns for statuses without tasks", () => {
    const columns = groupTasksByStatus([tasks[0]]);

    expect(columns).toEqual([
      { status: "Todo", tasks: [tasks[0]] },
      { status: "In Progress", tasks: [] },
      { status: "Done", tasks: [] },
    ]);
  });

  it("sorts tasks by priority and creation date inside each column", () => {
    const lowPriorityTask = {
      ...tasks[0],
      id: "task-low",
      title: "Tarea baja",
      priority: "Low" as const,
      createdAt: "2026-06-30T00:00:00.000Z",
    };
    const olderHighPriorityTask = {
      ...tasks[0],
      id: "task-high-old",
      title: "Tarea alta anterior",
      priority: "High" as const,
      createdAt: "2026-06-28T00:00:00.000Z",
    };
    const newerHighPriorityTask = {
      ...tasks[0],
      id: "task-high-new",
      title: "Tarea alta nueva",
      priority: "High" as const,
      createdAt: "2026-06-30T00:00:00.000Z",
    };
    const mediumPriorityTask = {
      ...tasks[0],
      id: "task-medium",
      title: "Tarea media",
      priority: "Medium" as const,
      createdAt: "2026-06-29T00:00:00.000Z",
    };

    const [todoColumn] = groupTasksByStatus([
      lowPriorityTask,
      olderHighPriorityTask,
      mediumPriorityTask,
      newerHighPriorityTask,
    ]);

    expect(todoColumn?.tasks.map((task) => task.id)).toEqual([
      "task-high-new",
      "task-high-old",
      "task-medium",
      "task-low",
    ]);
  });
});

describe("moveTaskToStatus", () => {
  it("moves a task to another status and sets the completion date", () => {
    const nextTasks = moveTaskToStatus(
      tasks,
      "task-1",
      "Done",
      "2026-06-30T10:00:00.000Z",
    );

    expect(nextTasks[0]).toMatchObject({
      id: "task-1",
      status: "Done",
      completedAt: "2026-06-30T10:00:00.000Z",
    });
  });

  it("clears the completion date when moving a task out of completed", () => {
    const nextTasks = moveTaskToStatus(tasks, "task-3", "In Progress");

    expect(nextTasks[2]).toMatchObject({
      id: "task-3",
      status: "In Progress",
      completedAt: null,
    });
  });

  it("keeps the same list reference when the status does not change", () => {
    const nextTasks = moveTaskToStatus(tasks, "task-1", "Todo");

    expect(nextTasks).toBe(tasks);
  });
});
