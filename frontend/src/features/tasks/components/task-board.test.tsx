import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TaskBoard } from "@/features/tasks/components/task-board";
import type { Task } from "@/features/tasks/types/task";

vi.mock("@/features/tasks/actions/task-actions", () => ({
  updateTaskStatusAction: vi.fn(),
}));

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Preparar entrega",
    description: "Revisar checklist final antes de publicar.",
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

afterEach(() => {
  cleanup();
});

describe("TaskBoard", () => {
  it("renders the task status columns in Spanish", () => {
    render(<TaskBoard tasks={tasks} />);

    expect(
      screen.getByRole("region", { name: "Columnas del tablero" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pendientes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "En proceso" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Completadas" }),
    ).toBeInTheDocument();
  });

  it("renders compact task cards with priority and completion date", () => {
    render(<TaskBoard tasks={tasks} />);

    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
    expect(screen.getByText("Prioridad alta")).toBeInTheDocument();
    expect(screen.getByText("Prioridad media")).toBeInTheDocument();
    expect(screen.getByText("Prioridad baja")).toBeInTheDocument();
    expect(screen.getByText(/Completada el/)).toBeInTheDocument();
  });

  function renderVersionedBoard(currentTasks: Task[]) {
    return (
      <TaskBoard
        key={currentTasks.map((task) => `${task.id}:${task.status}`).join("|")}
        tasks={currentTasks}
      />
    );
  }

  it("renders refreshed cards when board data is remounted with a new version", () => {
    const { rerender } = render(renderVersionedBoard(tasks.slice(0, 1)));

    expect(screen.getByText("Preparar entrega")).toBeInTheDocument();
    expect(screen.queryByText("Revisar diseño")).not.toBeInTheDocument();

    rerender(renderVersionedBoard(tasks.slice(0, 2)));

    expect(screen.getByText("Revisar diseño")).toBeInTheDocument();
  });

  it("makes compact task cards draggable", () => {
    render(<TaskBoard tasks={tasks} />);

    expect(
      screen.getByRole("button", { name: "Mover tarea Preparar entrega" }),
    ).toBeInTheDocument();
  });

  it("does not render status action buttons on board cards", () => {
    render(<TaskBoard tasks={tasks} />);

    expect(
      screen.queryByRole("button", { name: /marcar como completada/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /pasar a pendiente/i }),
    ).not.toBeInTheDocument();
  });

  it("renders an empty state for each empty column", () => {
    render(<TaskBoard tasks={[]} />);

    expect(screen.getAllByText("Sin tareas")).toHaveLength(3);
    expect(
      screen.getByText("Las tareas pendientes aparecerán en esta columna."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Las tareas en proceso aparecerán en esta columna."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Las tareas completadas aparecerán en esta columna."),
    ).toBeInTheDocument();
  });
});
