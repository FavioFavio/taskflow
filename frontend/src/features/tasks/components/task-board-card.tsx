"use client";

import type { ComponentProps, CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CalendarCheck2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getTaskPriorityCardClassName,
  TaskPriorityBadge,
  TaskStatusBadge,
} from "@/features/tasks/components/task-badges";
import type { Task } from "@/features/tasks/types/task";
import { cn } from "@/lib/utils";

type TaskBoardCardProps = {
  task: Task;
};

type TaskBoardCardContentProps = ComponentProps<typeof Card> & {
  task: Task;
};

function getShortDescription(description: string | null) {
  if (!description) {
    return null;
  }

  return description.length > 110
    ? `${description.slice(0, 107).trimEnd()}...`
    : description;
}

function formatCompletedAt(value: string) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function TaskBoardCardContent({
  className,
  task,
  ...props
}: TaskBoardCardContentProps) {
  const description = getShortDescription(task.description);

  return (
    <Card
      className={cn(
        "hover:border-primary/40 overflow-hidden border-l-4 transition-colors",
        getTaskPriorityCardClassName(task.priority),
        className,
      )}
      {...props}
    >
      <CardHeader className="gap-3 p-4">
        <div className="min-w-0 space-y-2">
          <h3 className="text-base font-semibold tracking-normal break-words">
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0">
        {description ? (
          <p className="text-muted-foreground text-sm leading-6">
            {description}
          </p>
        ) : null}
        {task.completedAt ? (
          <p className="text-muted-foreground flex items-center gap-2 text-xs">
            <CalendarCheck2 className="size-3.5" aria-hidden="true" />
            Completada el {formatCompletedAt(task.completedAt)}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function TaskBoardCard({ task }: TaskBoardCardProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: `task-board-card-${task.id}`,
      data: {
        taskId: task.id,
        status: task.status,
      },
    });
  const style: CSSProperties | undefined =
    transform && !isDragging
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: "transform 150ms ease",
        }
      : undefined;

  return (
    <TaskBoardCardContent
      ref={setNodeRef}
      style={style}
      aria-label={`Mover tarea ${task.title}`}
      className={cn(
        "cursor-grab touch-none active:cursor-grabbing",
        isDragging && "opacity-70 shadow-lg",
      )}
      task={task}
      {...attributes}
      {...listeners}
    />
  );
}
