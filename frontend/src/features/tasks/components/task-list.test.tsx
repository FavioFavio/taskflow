import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TaskList } from "@/features/tasks/components/task-list";
import type { Task } from "@/features/tasks/types/task";

vi.mock("@/features/tasks/components/task-card", () => ({
  TaskCard: ({ task }: { task: Task }) => <article>{task.title}</article>,
}));

describe("TaskList", () => {
  it("shows an empty state in Spanish when there are no tasks", () => {
    render(<TaskList tasks={[]} />);

    expect(screen.getByText("Todavía no hay tareas")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Creá tu primera tarea para empezar a organizar tu trabajo.",
      ),
    ).toBeInTheDocument();
  });

  it("renders user tasks", () => {
    render(
      <TaskList
        tasks={[
          {
            id: "task-1",
            title: "Preparar entrega",
            description: null,
            priority: "Medium",
            status: "Todo",
            dueDate: null,
            createdAt: "2026-06-28T00:00:00.000Z",
          },
        ]}
      />,
    );

    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
  });
});
