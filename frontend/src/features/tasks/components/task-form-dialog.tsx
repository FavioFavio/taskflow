"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

type TaskFormDialogProps = {
  task?: Task;
};

export function TaskFormDialog({ task }: TaskFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = Boolean(task);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={isEditing ? "outline" : "default"}>
          {isEditing ? null : <Plus className="size-4" aria-hidden="true" />}
          {isEditing ? "Editar" : "Nueva tarea"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tarea" : "Nueva tarea"}
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
