import { z } from "zod";

import { TASK_PRIORITIES, TASK_STATUSES } from "@/features/tasks/types/task";

export const taskFormSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio."),
  description: z.string().trim().optional(),
  priority: z.enum(TASK_PRIORITIES, {
    message: "Seleccioná una prioridad válida.",
  }),
  status: z.enum(TASK_STATUSES, {
    message: "Seleccioná un estado válido.",
  }),
  completedAt: z.string().datetime().nullable().optional(),
});

export const taskIdSchema = z.object({
  id: z.string().min(1, "La tarea no es válida."),
});

export const updateTaskSchema = taskFormSchema.extend({
  id: z.string().min(1, "La tarea no es válida."),
});

export const toggleTaskStatusSchema = taskIdSchema.extend({
  currentStatus: z.enum(TASK_STATUSES),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
export type UpdateTaskValues = z.infer<typeof updateTaskSchema>;
