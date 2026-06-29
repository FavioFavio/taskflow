import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";

import { getDashboardStats } from "@/features/dashboard/services/dashboard-service";

type CountResult = {
  count: number | null;
  error: { message: string } | null;
};

function createCountQuery(result: CountResult) {
  const filters: Array<[column: string, value: string]> = [];
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn((column: string, value: string) => {
      filters.push([column, value]);
      return query;
    }),
    then: (
      onFulfilled: (value: CountResult) => unknown,
      onRejected?: (reason: unknown) => unknown,
    ) => Promise.resolve(result).then(onFulfilled, onRejected),
  };

  return { filters, query };
}

function createSupabaseMock(results: CountResult[]) {
  const queries = results.map(createCountQuery);
  let queryIndex = 0;
  const from = vi.fn(
    () => queries[queryIndex++]?.query ?? queries.at(-1)?.query,
  );

  return {
    queries,
    supabase: { from } as unknown as SupabaseClient,
  };
}

describe("getDashboardStats", () => {
  it("loads task counts from Supabase and calculates pending tasks", async () => {
    const { queries, supabase } = createSupabaseMock([
      { count: 8, error: null },
      { count: 2, error: null },
      { count: 3, error: null },
      { count: 3, error: null },
    ]);

    await expect(getDashboardStats(supabase, "user-1")).resolves.toEqual({
      totalTasks: 8,
      pendingTasks: 2,
      inProgressTasks: 3,
      completedTasks: 3,
    });

    expect(queries[0]?.filters).toEqual([["user_id", "user-1"]]);
    expect(queries[1]?.filters).toEqual([
      ["user_id", "user-1"],
      ["status", "Todo"],
    ]);
    expect(queries[2]?.filters).toEqual([
      ["user_id", "user-1"],
      ["status", "In Progress"],
    ]);
    expect(queries[3]?.filters).toEqual([
      ["user_id", "user-1"],
      ["status", "Done"],
    ]);
  });

  it("returns zero values when Supabase counts are null", async () => {
    const { supabase } = createSupabaseMock([
      { count: null, error: null },
      { count: null, error: null },
      { count: null, error: null },
      { count: null, error: null },
    ]);

    await expect(getDashboardStats(supabase, "user-1")).resolves.toEqual({
      totalTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    });
  });

  it("throws a friendly error when Supabase fails", async () => {
    const { supabase } = createSupabaseMock([
      { count: 0, error: { message: "raw database error" } },
      { count: 0, error: null },
      { count: 0, error: null },
      { count: 0, error: null },
    ]);

    await expect(getDashboardStats(supabase, "user-1")).rejects.toThrow(
      "No pudimos cargar el resumen de tareas.",
    );
  });
});
