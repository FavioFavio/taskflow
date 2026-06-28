"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";

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
      >
        {isCompleted ? (
          <CheckCircle2 className="size-4" aria-hidden="true" />
        ) : (
          <Circle className="size-4" aria-hidden="true" />
        )}
        {isCompleted ? "Marcar pendiente" : "Completar"}
      </Button>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
