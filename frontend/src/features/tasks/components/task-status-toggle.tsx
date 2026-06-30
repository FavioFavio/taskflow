"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { Button } from "@/components/ui/button";
import { toggleTaskStatusAction } from "@/features/tasks/actions/task-actions";
import type { TaskStatus } from "@/features/tasks/types/task";
import { cn } from "@/lib/utils";

type TaskStatusToggleProps = {
  className?: string;
  presentation?: "default" | "compact";
  status: TaskStatus;
  taskId: string;
};

export function TaskStatusToggle({
  className,
  presentation = "default",
  status,
  taskId,
}: TaskStatusToggleProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isCompleted = status === "Done";
  const isCompact = presentation === "compact";

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
    <div className={cn("space-y-2", className)}>
      <Button
        type="button"
        variant={isCompleted ? "secondary" : "outline"}
        size={isCompact ? "sm" : "default"}
        className={cn(isCompact && "w-full justify-center")}
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
