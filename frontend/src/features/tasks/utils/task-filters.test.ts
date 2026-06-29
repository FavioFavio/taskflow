import { describe, expect, it } from "vitest";

import {
  DEFAULT_TASK_FILTERS,
  filterTasks,
  hasActiveTaskFilters,
  isTaskPriorityFilter,
  isTaskStatusFilter,
} from "@/features/tasks/utils/task-filters";
import type { Task } from "@/features/tasks/types/task";

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

describe("task filters", () => {
  it("searches tasks by title", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, search: "diseño" }),
    ).toEqual([tasks[1]]);
  });

  it("searches tasks case-insensitively", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, search: "PREPARAR" }),
    ).toEqual([tasks[0]]);
  });

  it("does not filter by text when search is empty", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, search: "   " }),
    ).toEqual(tasks);
  });

  it("filters pending tasks", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, status: "pending" }),
    ).toEqual([tasks[0]]);
  });

  it("filters tasks in progress", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, status: "in_progress" }),
    ).toEqual([tasks[1]]);
  });

  it("filters completed tasks", () => {
    expect(
      filterTasks(tasks, { ...DEFAULT_TASK_FILTERS, status: "completed" }),
    ).toEqual([tasks[2]]);
  });

  it("combines search, status and priority filters", () => {
    expect(
      filterTasks(tasks, {
        priority: "High",
        search: "preparar",
        status: "pending",
      }),
    ).toEqual([tasks[0]]);
  });

  it("detects active filters", () => {
    expect(hasActiveTaskFilters(DEFAULT_TASK_FILTERS)).toBe(false);
    expect(
      hasActiveTaskFilters({ ...DEFAULT_TASK_FILTERS, priority: "Low" }),
    ).toBe(true);
  });

  it("validates filter values", () => {
    expect(isTaskStatusFilter("completed")).toBe(true);
    expect(isTaskStatusFilter("in_progress")).toBe(true);
    expect(isTaskStatusFilter("archived")).toBe(false);
    expect(isTaskPriorityFilter("High")).toBe(true);
    expect(isTaskPriorityFilter("Urgent")).toBe(false);
  });
});
