import type { SupabaseClient } from "@supabase/supabase-js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createUserTask,
  deleteUserTask,
  listUserTasks,
  updateUserTask,
  updateUserTaskStatus,
} from "@/features/tasks/services/task-service";
import type { TaskRecord } from "@/features/tasks/types/task";

type QueryResult<TData> = {
  data: TData;
  error: { message: string } | null;
};

function createThenableQuery<TData>(result: QueryResult<TData>) {
  const filters: Array<[column: string, value: string]> = [];
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn((column: string, value: string) => {
      filters.push([column, value]);
      return query;
    }),
    order: vi.fn(() => query),
    returns: vi.fn(() => query),
    then: (
      onFulfilled: (value: QueryResult<TData>) => unknown,
      onRejected?: (reason: unknown) => unknown,
    ) => Promise.resolve(result).then(onFulfilled, onRejected),
  };

  return { filters, query };
}

function createMutationQuery(result: { error: { message: string } | null }) {
  const filters: Array<[column: string, value: string]> = [];
  const query = {
    eq: vi.fn((column: string, value: string) => {
      filters.push([column, value]);
      return query;
    }),
    then: (
      onFulfilled: (value: { error: { message: string } | null }) => unknown,
      onRejected?: (reason: unknown) => unknown,
    ) => Promise.resolve(result).then(onFulfilled, onRejected),
  };

  return { filters, query };
}

describe("task service", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("lists only tasks for the authenticated user", async () => {
    const taskRecord: TaskRecord = {
      id: "task-1",
      title: "Preparar entrega",
      description: null,
      priority: "Medium",
      status: "Todo",
      due_date: null,
      completed_at: null,
      created_at: "2026-06-28T00:00:00.000Z",
    };
    const { filters, query } = createThenableQuery<TaskRecord[]>({
      data: [taskRecord],
      error: null,
    });
    const supabase = {
      from: vi.fn(() => query),
    } as unknown as SupabaseClient;

    await expect(listUserTasks(supabase, "user-1")).resolves.toEqual([
      {
        id: "task-1",
        title: "Preparar entrega",
        description: null,
        priority: "Medium",
        status: "Todo",
        dueDate: null,
        completedAt: null,
        createdAt: "2026-06-28T00:00:00.000Z",
      },
    ]);
    expect(filters).toEqual([["user_id", "user-1"]]);
  });

  it("creates tasks with the authenticated user id", async () => {
    const insert = vi.fn(() => Promise.resolve({ error: null }));
    const supabase = {
      from: vi.fn(() => ({ insert })),
    } as unknown as SupabaseClient;

    await createUserTask(supabase, "user-1", {
      title: "Nueva tarea",
      description: "",
      priority: "Low",
      status: "Todo",
    });

    expect(insert).toHaveBeenCalledWith({
      title: "Nueva tarea",
      description: null,
      priority: "Low",
      status: "Todo",
      completed_at: null,
      user_id: "user-1",
    });
  });

  it("creates completed tasks with a completion date", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-29T12:30:00.000Z"));
    const insert = vi.fn(() => Promise.resolve({ error: null }));
    const supabase = {
      from: vi.fn(() => ({ insert })),
    } as unknown as SupabaseClient;

    await createUserTask(supabase, "user-1", {
      title: "Nueva tarea",
      description: "",
      priority: "Low",
      status: "Done",
    });

    expect(insert).toHaveBeenCalledWith({
      title: "Nueva tarea",
      description: null,
      priority: "Low",
      status: "Done",
      completed_at: "2026-06-29T12:30:00.000Z",
      user_id: "user-1",
    });
  });

  it("updates tasks by id and user id", async () => {
    const { filters, query } = createMutationQuery({ error: null });
    const update = vi.fn(() => query);
    const supabase = {
      from: vi.fn(() => ({ update })),
    } as unknown as SupabaseClient;

    await updateUserTask(supabase, "user-1", "task-1", {
      title: "Tarea actualizada",
      description: "Detalle",
      priority: "High",
      status: "In Progress",
    });

    expect(update).toHaveBeenCalledWith({
      title: "Tarea actualizada",
      description: "Detalle",
      priority: "High",
      status: "In Progress",
      completed_at: null,
    });
    expect(filters).toEqual([
      ["id", "task-1"],
      ["user_id", "user-1"],
    ]);
  });

  it("preserves the completion date when editing a completed task", async () => {
    const completedAt = "2026-06-29T12:30:00.000Z";
    const { query } = createMutationQuery({ error: null });
    const update = vi.fn(() => query);
    const supabase = {
      from: vi.fn(() => ({ update })),
    } as unknown as SupabaseClient;

    await updateUserTask(supabase, "user-1", "task-1", {
      title: "Tarea actualizada",
      description: "Detalle",
      priority: "High",
      status: "Done",
      completedAt,
    });

    expect(update).toHaveBeenCalledWith({
      title: "Tarea actualizada",
      description: "Detalle",
      priority: "High",
      status: "Done",
      completed_at: completedAt,
    });
  });

  it("deletes tasks by id and user id", async () => {
    const { filters, query } = createMutationQuery({ error: null });
    const deleteTask = vi.fn(() => query);
    const supabase = {
      from: vi.fn(() => ({ delete: deleteTask })),
    } as unknown as SupabaseClient;

    await deleteUserTask(supabase, "user-1", "task-1");

    expect(filters).toEqual([
      ["id", "task-1"],
      ["user_id", "user-1"],
    ]);
  });

  it("updates task status by id and user id", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-29T12:30:00.000Z"));
    const { filters, query } = createMutationQuery({ error: null });
    const update = vi.fn(() => query);
    const supabase = {
      from: vi.fn(() => ({ update })),
    } as unknown as SupabaseClient;

    await updateUserTaskStatus(supabase, "user-1", "task-1", "Done");

    expect(update).toHaveBeenCalledWith({
      status: "Done",
      completed_at: "2026-06-29T12:30:00.000Z",
    });
    expect(filters).toEqual([
      ["id", "task-1"],
      ["user_id", "user-1"],
    ]);
  });

  it("clears the completion date when reopening a task", async () => {
    const { query } = createMutationQuery({ error: null });
    const update = vi.fn(() => query);
    const supabase = {
      from: vi.fn(() => ({ update })),
    } as unknown as SupabaseClient;

    await updateUserTaskStatus(supabase, "user-1", "task-1", "Todo");

    expect(update).toHaveBeenCalledWith({
      status: "Todo",
      completed_at: null,
    });
  });
});
