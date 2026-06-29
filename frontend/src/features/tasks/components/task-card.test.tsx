import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TaskCard } from "@/features/tasks/components/task-card";
import type { Task } from "@/features/tasks/types/task";

vi.mock("@/features/tasks/components/task-delete-dialog", () => ({
  TaskDeleteDialog: () => <button type="button">Eliminar</button>,
}));

vi.mock("@/features/tasks/components/task-form-dialog", () => ({
  TaskFormDialog: () => <button type="button">Editar</button>,
}));

vi.mock("@/features/tasks/components/task-status-toggle", () => ({
  TaskStatusToggle: () => <button type="button">Marcar pendiente</button>,
}));

const completedTask: Task = {
  id: "task-1",
  title: "Enviar resumen",
  description: null,
  priority: "High",
  status: "Done",
  dueDate: null,
  completedAt: "2026-06-29T12:30:00.000Z",
  createdAt: "2026-06-28T00:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("TaskCard", () => {
  it("shows the completion date when it exists", () => {
    render(<TaskCard task={completedTask} />);

    expect(screen.getByText("Enviar resumen")).toBeInTheDocument();
    expect(screen.getByText(/Completada el/)).toBeInTheDocument();
  });

  it("does not show the completion date when it does not exist", () => {
    render(<TaskCard task={{ ...completedTask, completedAt: null }} />);

    expect(screen.queryByText(/Completada el/)).not.toBeInTheDocument();
  });

  it.each([
    ["Low", "Prioridad baja"],
    ["Medium", "Prioridad media"],
    ["High", "Prioridad alta"],
  ] as const)("shows the %s priority label", (priority, label) => {
    render(<TaskCard task={{ ...completedTask, priority }} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
