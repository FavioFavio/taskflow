"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  createUserTask,
  deleteUserTask,
  updateUserTask,
  updateUserTaskStatus,
} from "@/features/tasks/services/task-service";
import {
  taskFormSchema,
  taskIdSchema,
  toggleTaskStatusSchema,
  updateTaskSchema,
} from "@/features/tasks/schemas/task-schema";

export type TaskActionState = {
  error?: string;
  success?: string;
};

const TASKS_PATH = "/tasks";

type AuthenticatedTaskContext = {
  supabase: Awaited<ReturnType<typeof createClient>>;
  userId: string;
};

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Necesitás iniciar sesión para continuar." };
  }

  return { supabase, userId: user.id };
}

async function runTaskMutation(
  mutation: (context: AuthenticatedTaskContext) => Promise<void>,
  fallbackError: string,
  success: string,
): Promise<TaskActionState> {
  const auth = await getAuthenticatedUserId();

  if ("error" in auth) {
    return { error: auth.error };
  }

  try {
    await mutation(auth);
    revalidatePath(TASKS_PATH);

    return { success };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : fallbackError,
    };
  }
}

export async function createTaskAction(
  values: unknown,
): Promise<TaskActionState> {
  const parsedValues = taskFormSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisá los datos de la tarea." };
  }

  return runTaskMutation(
    (auth) => createUserTask(auth.supabase, auth.userId, parsedValues.data),
    "No pudimos crear la tarea.",
    "Tarea creada.",
  );
}

export async function updateTaskAction(
  values: unknown,
): Promise<TaskActionState> {
  const parsedValues = updateTaskSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisá los datos de la tarea." };
  }

  const { id, ...taskValues } = parsedValues.data;
  return runTaskMutation(
    (auth) => updateUserTask(auth.supabase, auth.userId, id, taskValues),
    "No pudimos actualizar la tarea.",
    "Tarea actualizada.",
  );
}

export async function deleteTaskAction(
  values: unknown,
): Promise<TaskActionState> {
  const parsedValues = taskIdSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "La tarea no es válida." };
  }

  return runTaskMutation(
    (auth) => deleteUserTask(auth.supabase, auth.userId, parsedValues.data.id),
    "No pudimos eliminar la tarea.",
    "Tarea eliminada.",
  );
}

export async function toggleTaskStatusAction(
  values: unknown,
): Promise<TaskActionState> {
  const parsedValues = toggleTaskStatusSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "La tarea no es válida." };
  }

  const nextStatus =
    parsedValues.data.currentStatus === "Done" ? "Todo" : "Done";

  return runTaskMutation(
    (auth) =>
      updateUserTaskStatus(
        auth.supabase,
        auth.userId,
        parsedValues.data.id,
        nextStatus,
      ),
    "No pudimos cambiar el estado de la tarea.",
    "Estado actualizado.",
  );
}
