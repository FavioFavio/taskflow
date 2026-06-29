"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { deleteTaskAction } from "@/features/tasks/actions/task-actions";

type TaskDeleteDialogProps = {
  taskId: string;
};

export function TaskDeleteDialog({ taskId }: TaskDeleteDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function onDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteTaskAction({ id: taskId });

      if (result.error) {
        setError(result.error);
        return;
      }

      showToast({
        message: result.success ?? "Tarea eliminada correctamente.",
      });
      setOpen(false);
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2 className="size-4" aria-hidden="true" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar tarea</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La tarea se eliminará de forma
            permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
