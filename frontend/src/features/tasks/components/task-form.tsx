"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createTaskAction,
  updateTaskAction,
} from "@/features/tasks/actions/task-actions";
import {
  taskFormSchema,
  type TaskFormValues,
} from "@/features/tasks/schemas/task-schema";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/features/tasks/utils/task-labels";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
} from "@/features/tasks/types/task";

type TaskFormProps = {
  mode: "create" | "edit";
  onSuccess?: () => void;
  task?: Task;
};

function getDefaultValues(task?: Task): TaskFormValues {
  return {
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "Medium",
    status: task?.status ?? "Todo",
  };
}

export function TaskForm({ mode, onSuccess, task }: TaskFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: getDefaultValues(task),
  });

  function onSubmit(values: TaskFormValues) {
    setFormError(null);
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createTaskAction(values)
          : await updateTaskAction({ ...values, id: task?.id });

      if (result.error) {
        setFormError(result.error);
        return;
      }

      reset(getDefaultValues(task));
      onSuccess?.();
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor={`${mode}-task-title`}>Título</Label>
        <Input
          id={`${mode}-task-title`}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={
            errors.title ? `${mode}-task-title-error` : undefined
          }
          {...register("title")}
        />
        {errors.title ? (
          <p
            id={`${mode}-task-title-error`}
            className="text-destructive text-sm"
            role="alert"
          >
            {errors.title.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${mode}-task-description`}>Descripción</Label>
        <Textarea
          id={`${mode}-task-description`}
          aria-invalid={Boolean(errors.description)}
          {...register("description")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-task-priority`}>Prioridad</Label>
          <Select
            id={`${mode}-task-priority`}
            aria-invalid={Boolean(errors.priority)}
            {...register("priority")}
          >
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {TASK_PRIORITY_LABELS[priority]}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${mode}-task-status`}>Estado</Label>
          <Select
            id={`${mode}-task-status`}
            aria-invalid={Boolean(errors.status)}
            {...register("status")}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {TASK_STATUS_LABELS[status]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {formError ? (
        <p
          className="text-destructive border-destructive/30 bg-destructive/10 rounded-md border px-3 py-2 text-sm"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
