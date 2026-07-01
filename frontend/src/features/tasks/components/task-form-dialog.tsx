"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/features/tasks/components/task-form";
import type { Task } from "@/features/tasks/types/task";
import { cn } from "@/lib/utils";

type TaskFormDialogProps = {
  className?: string;
  presentation?: "default" | "header";
  task?: Task;
};

export function TaskFormDialog({
  className,
  presentation = "default",
  task,
}: TaskFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = Boolean(task);
  const isHeaderPresentation = presentation === "header";
  const triggerLabel = isEditing ? "Editar tarea" : "Agregar tarea";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={isEditing ? "outline" : "default"}
          size={isHeaderPresentation ? "lg" : "default"}
          className={cn(
            isHeaderPresentation &&
              "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-normal shadow-md hover:shadow-lg",
            className,
          )}
          aria-label={triggerLabel}
        >
          {isEditing ? (
            <Pencil className="size-4" aria-hidden="true" />
          ) : (
            <Plus className="size-4" aria-hidden="true" />
          )}
          <span className={isHeaderPresentation ? "hidden sm:inline" : ""}>
            {isEditing ? "Editar" : "Agregar tarea"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tarea" : "Agregar tarea"}
          </DialogTitle>
          <DialogDescription>
            Completá los datos de la tarea y guardá los cambios.
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          mode={isEditing ? "edit" : "create"}
          task={task}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
