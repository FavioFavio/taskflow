"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { Button } from "@/components/ui/button";
import { toggleTaskStatusAction } from "@/features/tasks/actions/task-actions";
import type { TaskStatus } from "@/features/tasks/types/task";

type TaskStatusToggleProps = {
  status: TaskStatus;
  taskId: string;
};

export function TaskStatusToggle({ status, taskId }: TaskStatusToggleProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isCompleted = status === "Done";

  function onToggle() {
    setError(null);
    startTransition(async () => {
      const result = await toggleTaskStatusAction({
        id: taskId,
        currentStatus: status,
      });

      if (result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant={isCompleted ? "secondary" : "outline"}
        onClick={onToggle}
        disabled={isPending}
        aria-label={
          isCompleted ? "Marcar tarea como pendiente" : "Completar tarea"
        }
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : isCompleted ? (
          <CheckCircle2 className="size-4" aria-hidden="true" />
        ) : (
          <Circle className="size-4" aria-hidden="true" />
        )}
        {isPending
          ? "Actualizando..."
          : isCompleted
            ? "Marcar pendiente"
            : "Completar"}
      </Button>
      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}
    </div>
  );
}
