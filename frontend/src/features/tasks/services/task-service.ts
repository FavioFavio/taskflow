import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  Task,
  TaskPriority,
  TaskRecord,
  TaskStatus,
} from "@/features/tasks/types/task";

const TASKS_SELECT_COLUMNS =
  "id,title,description,priority,status,due_date,completed_at,created_at";

type TaskMutationInput = {
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
  completedAt?: string | null;
};

function mapTaskRecord(record: TaskRecord): Task {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    priority: record.priority,
    status: record.status,
    dueDate: record.due_date,
    completedAt: record.completed_at,
    createdAt: record.created_at,
  };
}

function getTaskDescription(description?: string) {
  const trimmedDescription = description?.trim();

  return trimmedDescription ? trimmedDescription : null;
}

function getTaskCompletedAt(status: TaskStatus, completedAt?: string | null) {
  if (status !== "Done") {
    return null;
  }

  return completedAt ?? new Date().toISOString();
}

export async function listUserTasks(
  supabase: SupabaseClient,
  userId: string,
): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(TASKS_SELECT_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<TaskRecord[]>();

  if (error) {
    throw new Error("No pudimos cargar tus tareas.");
  }

  return (data ?? []).map(mapTaskRecord);
}

export async function createUserTask(
  supabase: SupabaseClient,
  userId: string,
  values: TaskMutationInput,
) {
  const { error } = await supabase.from("tasks").insert({
    title: values.title,
    description: getTaskDescription(values.description),
    priority: values.priority,
    status: values.status,
    completed_at: getTaskCompletedAt(values.status, values.completedAt),
    user_id: userId,
  });

  if (error) {
    throw new Error("No pudimos crear la tarea.");
  }
}

export async function updateUserTask(
  supabase: SupabaseClient,
  userId: string,
  taskId: string,
  values: TaskMutationInput,
) {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: values.title,
      description: getTaskDescription(values.description),
      priority: values.priority,
      status: values.status,
      completed_at: getTaskCompletedAt(values.status, values.completedAt),
    })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("No pudimos actualizar la tarea.");
  }
}

export async function deleteUserTask(
  supabase: SupabaseClient,
  userId: string,
  taskId: string,
) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("No pudimos eliminar la tarea.");
  }
}

export async function updateUserTaskStatus(
  supabase: SupabaseClient,
  userId: string,
  taskId: string,
  status: TaskStatus,
) {
  const { error } = await supabase
    .from("tasks")
    .update({
      status,
      completed_at: getTaskCompletedAt(status),
    })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("No pudimos cambiar el estado de la tarea.");
  }
}
