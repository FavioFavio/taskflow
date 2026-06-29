import { describe, expect, it } from "vitest";

import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/features/tasks/utils/task-labels";

describe("task labels", () => {
  it("returns Spanish priority labels", () => {
    expect(TASK_PRIORITY_LABELS).toEqual({
      Low: "Baja",
      Medium: "Media",
      High: "Alta",
    });
  });

  it("returns Spanish status labels", () => {
    expect(TASK_STATUS_LABELS).toEqual({
      Todo: "Pendiente",
      "In Progress": "En proceso",
      Done: "Completada",
    });
  });
});
