import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import {
  createUserTask,
  deleteUserTask,
  updateUserTask,
  updateUserTaskStatus,
} from "@/features/tasks/services/task-service";
import {
  createTaskAction,
  deleteTaskAction,
  toggleTaskStatusAction,
  updateTaskAction,
} from "@/features/tasks/actions/task-actions";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/features/tasks/services/task-service", () => ({
  createUserTask: vi.fn(),
  deleteUserTask: vi.fn(),
  updateUserTask: vi.fn(),
  updateUserTaskStatus: vi.fn(),
}));

const supabaseMock = {
  auth: {
    getUser: vi.fn(),
  },
};

function mockAuthenticatedUser(userId = "user-1") {
  vi.mocked(createClient).mockResolvedValue(supabaseMock);
  supabaseMock.auth.getUser.mockResolvedValue({
    data: { user: { id: userId } },
  });
}

describe("task actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthenticatedUser();
  });

  it("creates a task for the authenticated user and revalidates tasks", async () => {
    vi.mocked(createUserTask).mockResolvedValue(undefined);

    const result = await createTaskAction({
      title: "Preparar entrega",
      description: "",
      priority: "Medium",
      status: "Todo",
    });

    expect(result).toEqual({ success: "Tarea creada." });
    expect(createUserTask).toHaveBeenCalledWith(supabaseMock, "user-1", {
      title: "Preparar entrega",
      description: "",
      priority: "Medium",
      status: "Todo",
    });
    expect(revalidatePath).toHaveBeenCalledWith("/tasks");
  });

  it("does not create a task when validation fails", async () => {
    const result = await createTaskAction({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
    });

    expect(result).toEqual({ error: "Revisá los datos de la tarea." });
    expect(createUserTask).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("updates a task for the authenticated user", async () => {
    vi.mocked(updateUserTask).mockResolvedValue(undefined);

    const result = await updateTaskAction({
      id: "task-1",
      title: "Tarea editada",
      description: "Detalle",
      priority: "High",
      status: "In Progress",
    });

    expect(result).toEqual({ success: "Tarea actualizada." });
    expect(updateUserTask).toHaveBeenCalledWith(
      supabaseMock,
      "user-1",
      "task-1",
      {
        title: "Tarea editada",
        description: "Detalle",
        priority: "High",
        status: "In Progress",
      },
    );
  });

  it("deletes a task for the authenticated user", async () => {
    vi.mocked(deleteUserTask).mockResolvedValue(undefined);

    const result = await deleteTaskAction({ id: "task-1" });

    expect(result).toEqual({ success: "Tarea eliminada." });
    expect(deleteUserTask).toHaveBeenCalledWith(
      supabaseMock,
      "user-1",
      "task-1",
    );
  });

  it("toggles completed tasks back to pending", async () => {
    vi.mocked(updateUserTaskStatus).mockResolvedValue(undefined);

    const result = await toggleTaskStatusAction({
      id: "task-1",
      currentStatus: "Done",
    });

    expect(result).toEqual({ success: "Estado actualizado." });
    expect(updateUserTaskStatus).toHaveBeenCalledWith(
      supabaseMock,
      "user-1",
      "task-1",
      "Todo",
    );
  });

  it("returns service errors without revalidating", async () => {
    vi.mocked(updateUserTask).mockRejectedValue(
      new Error("No pudimos actualizar la tarea."),
    );

    const result = await updateTaskAction({
      id: "task-1",
      title: "Tarea editada",
      description: "",
      priority: "Medium",
      status: "Todo",
    });

    expect(result).toEqual({ error: "No pudimos actualizar la tarea." });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns a clear error when the user is not authenticated", async () => {
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: null },
    });

    const result = await deleteTaskAction({ id: "task-1" });

    expect(result).toEqual({
      error: "Necesitás iniciar sesión para continuar.",
    });
    expect(deleteUserTask).not.toHaveBeenCalled();
  });
});
