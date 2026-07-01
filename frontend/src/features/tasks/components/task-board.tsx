"use client";

import { useMemo, useState, useTransition } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { CheckCircle2, CircleDashed, Timer } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { updateTaskStatusAction } from "@/features/tasks/actions/task-actions";
import { TaskBoardCardContent } from "@/features/tasks/components/task-board-card";
import { TaskBoardColumn } from "@/features/tasks/components/task-board-column";
import type { Task, TaskStatus } from "@/features/tasks/types/task";
import {
  groupTasksByStatus,
  moveTaskToStatus,
} from "@/features/tasks/utils/task-board";

type TaskBoardProps = {
  tasks: Task[];
};

const COLUMN_CONFIG: Record<
  TaskStatus,
  {
    accentClassName: string;
    emptyDescription: string;
    icon: typeof CircleDashed;
    title: string;
  }
> = {
  Todo: {
    accentClassName: "bg-warning/15 text-warning-foreground dark:text-warning",
    emptyDescription: "Las tareas pendientes aparecerán en esta columna.",
    icon: CircleDashed,
    title: "Pendientes",
  },
  "In Progress": {
    accentClassName: "bg-primary/10 text-primary",
    emptyDescription: "Las tareas en proceso aparecerán en esta columna.",
    icon: Timer,
    title: "En proceso",
  },
  Done: {
    accentClassName: "bg-success/10 text-success",
    emptyDescription: "Las tareas completadas aparecerán en esta columna.",
    icon: CheckCircle2,
    title: "Completadas",
  },
};

export function TaskBoard({ tasks }: TaskBoardProps) {
  const [boardTasks, setBoardTasks] = useState(tasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const columns = useMemo(() => groupTasksByStatus(boardTasks), [boardTasks]);
  const activeTask = useMemo(
    () => boardTasks.find((task) => task.id === activeTaskId) ?? null,
    [activeTaskId, boardTasks],
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  function onDragStart(event: DragStartEvent) {
    const taskId = event.active.data.current?.taskId as string | undefined;

    setActiveTaskId(taskId ?? null);
  }

  function onDragEnd(event: DragEndEvent) {
    const taskId = event.active.data.current?.taskId as string | undefined;
    const currentStatus = event.active.data.current?.status as
      | TaskStatus
      | undefined;
    const nextStatus = event.over?.data.current?.status as
      | TaskStatus
      | undefined;

    if (
      isPending ||
      !taskId ||
      !currentStatus ||
      !nextStatus ||
      currentStatus === nextStatus
    ) {
      setActiveTaskId(null);
      return;
    }

    setError(null);
    const previousTasks = boardTasks;
    setBoardTasks((currentTasks) =>
      moveTaskToStatus(currentTasks, taskId, nextStatus),
    );

    startTransition(async () => {
      const result = await updateTaskStatusAction({
        id: taskId,
        status: nextStatus,
      });

      if (result.error) {
        setBoardTasks(previousTasks);
        setError(result.error);
      }
    });
    setActiveTaskId(null);
  }

  function onDragCancel() {
    setActiveTaskId(null);
  }

  return (
    <div className="space-y-4">
      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}
      <DndContext
        id="task-board-dnd"
        sensors={sensors}
        onDragCancel={onDragCancel}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <div
          className="overflow-x-auto pb-2 md:overflow-visible"
          role="region"
          aria-label="Columnas del tablero"
          tabIndex={0}
        >
          <div className="grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-4 md:grid-flow-row md:grid-cols-3">
            {columns.map((column) => (
              <TaskBoardColumn
                key={column.status}
                accentClassName={COLUMN_CONFIG[column.status].accentClassName}
                emptyDescription={COLUMN_CONFIG[column.status].emptyDescription}
                icon={COLUMN_CONFIG[column.status].icon}
                status={column.status}
                tasks={column.tasks}
                title={COLUMN_CONFIG[column.status].title}
              />
            ))}
          </div>
        </div>
        <DragOverlay zIndex={50}>
          {activeTask ? (
            <TaskBoardCardContent
              className="z-50 rotate-1 cursor-grabbing shadow-2xl"
              task={activeTask}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
