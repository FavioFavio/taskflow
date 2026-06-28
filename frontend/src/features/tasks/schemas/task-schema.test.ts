import { describe, expect, it } from "vitest";

import {
  taskFormSchema,
  toggleTaskStatusSchema,
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
});
