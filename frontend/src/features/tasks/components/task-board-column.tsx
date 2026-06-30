"use client";

import { useDroppable } from "@dnd-kit/core";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TaskBoardCard } from "@/features/tasks/components/task-board-card";
import type { Task, TaskStatus } from "@/features/tasks/types/task";
import { cn } from "@/lib/utils";

type TaskBoardColumnProps = {
  accentClassName: string;
  emptyDescription: string;
  icon: LucideIcon;
  status: TaskStatus;
  tasks: Task[];
  title: string;
};

export function TaskBoardColumn({
  accentClassName,
  emptyDescription,
  icon: Icon,
  status,
  tasks,
  title,
}: TaskBoardColumnProps) {
  const titleId = `task-board-column-${status.replace(/\s+/g, "-").toLowerCase()}`;
  const { isOver, setNodeRef } = useDroppable({
    id: `task-board-column-${status}`,
    data: { status },
  });

  return (
    <section ref={setNodeRef} aria-labelledby={titleId} className="min-w-0">
      <Card
        className={cn(
          "bg-card/80 h-full overflow-hidden transition-colors",
          isOver && "border-primary/50 bg-primary/5",
        )}
      >
        <CardHeader className="border-border/70 border-b p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md",
                  accentClassName,
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <h3
                id={titleId}
                className="truncate text-base font-semibold tracking-normal"
              >
                {title}
              </h3>
            </div>
            <Badge variant="outline" aria-label={`${tasks.length} tareas`}>
              {tasks.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-3">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskBoardCard key={task.id} task={task} />)
          ) : (
            <div className="border-border/80 bg-background/70 rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">Sin tareas</p>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {emptyDescription}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
