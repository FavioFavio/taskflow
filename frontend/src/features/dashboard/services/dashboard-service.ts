import type { SupabaseClient } from "@supabase/supabase-js";

import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";

const COMPLETED_TASK_STATUS = "Done";
const IN_PROGRESS_TASK_STATUS = "In Progress";
const PENDING_TASK_STATUS = "Todo";

async function getTaskCount(
  supabase: SupabaseClient,
  userId: string,
  statusFilter?: "completed" | "inProgress" | "pending",
) {
  let query = supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (statusFilter) {
    const status =
      statusFilter === "completed"
        ? COMPLETED_TASK_STATUS
        : statusFilter === "inProgress"
          ? IN_PROGRESS_TASK_STATUS
          : PENDING_TASK_STATUS;

    query = query.eq("status", status);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error("No pudimos cargar el resumen de tareas.");
  }

  return count ?? 0;
}

export async function getDashboardStats(
  supabase: SupabaseClient,
  userId: string,
): Promise<DashboardStats> {
  const [totalTasks, pendingTasks, inProgressTasks, completedTasks] =
    await Promise.all([
      getTaskCount(supabase, userId),
      getTaskCount(supabase, userId, "pending"),
      getTaskCount(supabase, userId, "inProgress"),
      getTaskCount(supabase, userId, "completed"),
    ]);

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
}
