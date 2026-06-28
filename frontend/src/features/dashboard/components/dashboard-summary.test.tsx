import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardSummary } from "@/features/dashboard/components/dashboard-summary";

describe("DashboardSummary", () => {
  it("renders task counters in Spanish", () => {
    render(
      <DashboardSummary
        stats={{
          totalTasks: 8,
          pendingTasks: 5,
          completedTasks: 3,
        }}
      />,
    );

    expect(screen.getByText("Total de tareas")).toBeInTheDocument();
    expect(screen.getByText("Tareas pendientes")).toBeInTheDocument();
    expect(screen.getByText("Tareas completadas")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows zero values and an empty state when there are no tasks", () => {
    render(
      <DashboardSummary
        stats={{
          totalTasks: 0,
          pendingTasks: 0,
          completedTasks: 0,
        }}
      />,
    );

    expect(screen.getAllByText("0")).toHaveLength(3);
    expect(screen.getByText("Todavía no hay tareas")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cuando tengas tareas registradas, el resumen aparecerá aquí.",
      ),
    ).toBeInTheDocument();
  });
});
