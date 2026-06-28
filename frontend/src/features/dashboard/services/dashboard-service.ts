import type { SupabaseClient } from "@supabase/supabase-js";

import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";

const COMPLETED_TASK_STATUS = "Done";

async function getTaskCount(
  supabase: SupabaseClient,
  userId: string,
  statusFilter?: "completed",
) {
  let query = supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (statusFilter === "completed") {
    query = query.eq("status", COMPLETED_TASK_STATUS);
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
  const [totalTasks, completedTasks] = await Promise.all([
    getTaskCount(supabase, userId),
    getTaskCount(supabase, userId, "completed"),
  ]);
  const pendingTasks = totalTasks - completedTasks;

  return {
    totalTasks,
    pendingTasks,
    completedTasks,
  };
}
