import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TaskList } from "@/features/tasks/components/task-list";
import type { Task } from "@/features/tasks/types/task";

vi.mock("@/features/tasks/components/task-card", () => ({
  TaskCard: ({ task }: { task: Task }) => <article>{task.title}</article>,
}));

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Preparar entrega",
    description: null,
    priority: "High",
    status: "Todo",
    dueDate: null,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Revisar diseño",
    description: null,
    priority: "Medium",
    status: "In Progress",
    dueDate: null,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Enviar resumen",
    description: null,
    priority: "Low",
    status: "Done",
    dueDate: null,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
];

afterEach(() => {
  cleanup();
});

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
    render(<TaskList tasks={tasks} />);

    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
    expect(screen.getByText("Revisar diseño")).toBeInTheDocument();
    expect(screen.getByText("Enviar resumen")).toBeInTheDocument();
  });

  it("searches tasks by title", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "diseño" },
    });

    expect(screen.getByText("Revisar diseño")).toBeInTheDocument();
    expect(screen.queryByText("Preparar entrega")).not.toBeInTheDocument();
  });

  it("filters tasks by status", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Estado"), {
      target: { value: "completed" },
    });

    expect(screen.getByText("Enviar resumen")).toBeInTheDocument();
    expect(screen.queryByText("Preparar entrega")).not.toBeInTheDocument();
  });

  it("filters tasks in progress", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Estado"), {
      target: { value: "in_progress" },
    });

    expect(screen.getByText("Revisar diseño")).toBeInTheDocument();
    expect(screen.queryByText("Preparar entrega")).not.toBeInTheDocument();
    expect(screen.queryByText("Enviar resumen")).not.toBeInTheDocument();
  });

  it("filters tasks by priority and combines filters", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Estado"), {
      target: { value: "pending" },
    });
    fireEvent.change(screen.getByLabelText("Prioridad"), {
      target: { value: "High" },
    });

    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
    expect(screen.queryByText("Revisar diseño")).not.toBeInTheDocument();
    expect(screen.queryByText("Enviar resumen")).not.toBeInTheDocument();
  });

  it("resets filters", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "diseño" },
    });
    fireEvent.change(screen.getByLabelText("Estado"), {
      target: { value: "completed" },
    });
    fireEvent.change(screen.getByLabelText("Prioridad"), {
      target: { value: "Low" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(screen.getByLabelText("Buscar")).toHaveValue("");
    expect(screen.getByLabelText("Estado")).toHaveValue("all");
    expect(screen.getByLabelText("Prioridad")).toHaveValue("all");
    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
    expect(screen.getByText("Revisar diseño")).toBeInTheDocument();
    expect(screen.getByText("Enviar resumen")).toBeInTheDocument();
  });

  it("shows a filtered empty state in Spanish", () => {
    render(<TaskList tasks={tasks} />);

    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "inexistente" },
    });

    expect(screen.getByText("No encontramos tareas")).toBeInTheDocument();
    expect(
      screen.getByText("Probá ajustar la búsqueda o limpiar los filtros."),
    ).toBeInTheDocument();
  });
});
