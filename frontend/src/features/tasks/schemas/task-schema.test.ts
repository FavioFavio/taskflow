import { describe, expect, it } from "vitest";

import {
  taskFormSchema,
  toggleTaskStatusSchema,
  updateTaskStatusSchema,
  updateTaskSchema,
} from "@/features/tasks/schemas/task-schema";

describe("task schemas", () => {
  it("requires a title", () => {
    const result = taskFormSchema.safeParse({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
    });

    expect(result.success).toBe(false);
  });

  it("accepts documented task values", () => {
    const result = updateTaskSchema.safeParse({
      id: "task-1",
      title: "Preparar entrega",
      description: "Revisar detalles",
      priority: "High",
      status: "In Progress",
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsupported priorities", () => {
    const result = taskFormSchema.safeParse({
      title: "Preparar entrega",
      description: "",
      priority: "Urgent",
      status: "Todo",
    });

    expect(result.success).toBe(false);
  });

  it("validates toggle payloads", () => {
    const result = toggleTaskStatusSchema.safeParse({
      id: "task-1",
      currentStatus: "Done",
    });

    expect(result.success).toBe(true);
  });

  it("validates direct status update payloads", () => {
    const result = updateTaskStatusSchema.safeParse({
      id: "task-1",
      status: "In Progress",
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsupported direct status updates", () => {
    const result = updateTaskStatusSchema.safeParse({
      id: "task-1",
      status: "Archived",
    });

    expect(result.success).toBe(false);
  });
});
