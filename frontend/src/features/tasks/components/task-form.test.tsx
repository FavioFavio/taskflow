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
});
