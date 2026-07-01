import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TaskSummary } from "@/features/tasks/components/task-summary";

describe("TaskSummary", () => {
  it("renders task counters in Spanish", () => {
    render(
      <TaskSummary
        stats={{
          totalTasks: 8,
          pendingTasks: 2,
          inProgressTasks: 3,
          completedTasks: 3,
        }}
      />,
    );

    expect(screen.getByText("Total de tareas")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
    expect(screen.getByText("En proceso")).toBeInTheDocument();
    expect(screen.getByText("Completadas")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByText("3")).toHaveLength(2);
  });

  it("shows zero values and an empty state when there are no tasks", () => {
    render(
      <TaskSummary
        stats={{
          totalTasks: 0,
          pendingTasks: 0,
          inProgressTasks: 0,
          completedTasks: 0,
        }}
      />,
    );

    expect(screen.getAllByText("0")).toHaveLength(4);
    expect(screen.getByText("Todavía no hay tareas")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cuando tengas tareas registradas, el resumen aparecerá aquí.",
      ),
    ).toBeInTheDocument();
  });
});
