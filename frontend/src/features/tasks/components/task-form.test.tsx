import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/toast";
import {
  createTaskAction,
  updateTaskAction,
} from "@/features/tasks/actions/task-actions";
import { TaskForm } from "@/features/tasks/components/task-form";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("@/features/tasks/actions/task-actions", () => ({
  createTaskAction: vi.fn(),
  updateTaskAction: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("TaskForm", () => {
  it("refreshes the current route after creating a task", async () => {
    vi.mocked(createTaskAction).mockResolvedValue({ success: "Tarea creada." });
    const onSuccess = vi.fn();

    render(
      <ToastProvider>
        <TaskForm mode="create" onSuccess={onSuccess} />
      </ToastProvider>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Preparar tablero" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(createTaskAction).toHaveBeenCalledWith({
        completedAt: null,
        description: "",
        priority: "Medium",
        status: "Todo",
        title: "Preparar tablero",
      });
    });
    expect(refreshMock).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
    expect(updateTaskAction).not.toHaveBeenCalled();
  });

  it("shows validation feedback when the title is missing", async () => {
    render(
      <ToastProvider>
        <TaskForm mode="create" />
      </ToastProvider>,
    );

    fireEvent.submit(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "El título es obligatorio.",
    );
    expect(createTaskAction).not.toHaveBeenCalled();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("shows server action errors without refreshing the current route", async () => {
    vi.mocked(createTaskAction).mockResolvedValue({
      error: "No pudimos crear la tarea.",
    });
    const onSuccess = vi.fn();

    render(
      <ToastProvider>
        <TaskForm mode="create" onSuccess={onSuccess} />
      </ToastProvider>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Preparar tablero" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No pudimos crear la tarea.",
    );
    expect(refreshMock).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(updateTaskAction).not.toHaveBeenCalled();
  });
});
