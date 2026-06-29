"use client";

import { useMemo, useState } from "react";
import { ClipboardList, RotateCcw, Search, SearchX } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { TaskCard } from "@/features/tasks/components/task-card";
import type { Task } from "@/features/tasks/types/task";
import {
  DEFAULT_TASK_FILTERS,
  TASK_PRIORITY_FILTER_LABELS,
  TASK_PRIORITY_FILTERS,
  TASK_STATUS_FILTER_LABELS,
  TASK_STATUS_FILTERS,
  filterTasks,
  hasActiveTaskFilters,
  isTaskPriorityFilter,
  isTaskStatusFilter,
  type TaskFilters,
} from "@/features/tasks/utils/task-filters";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_TASK_FILTERS);
  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [filters, tasks],
  );
  const hasFilters = hasActiveTaskFilters(filters);

  function updateFilter<TKey extends keyof TaskFilters>(
    key: TKey,
    value: TaskFilters[TKey],
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Todavía no hay tareas"
        description="Creá tu primera tarea para empezar a organizar tu trabajo."
      />
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--primary),transparent_94%)_48%,color-mix(in_oklch,var(--accent),transparent_45%)_100%)]">
        <CardHeader className="gap-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
            <div className="space-y-2">
              <Label htmlFor="task-search">Buscar</Label>
              <div className="relative">
                <Search
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <Input
                  id="task-search"
                  className="bg-background/70 pl-9"
                  placeholder="Buscar por título"
                  value={filters.search}
                  onChange={(event) =>
                    updateFilter("search", event.target.value)
                  }
                  aria-label="Buscar tareas por título"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-status-filter">Estado</Label>
              <Select
                id="task-status-filter"
                className="bg-background/70"
                value={filters.status}
                onChange={(event) => {
                  if (isTaskStatusFilter(event.target.value)) {
                    updateFilter("status", event.target.value);
                  }
                }}
              >
                {TASK_STATUS_FILTERS.map((status) => (
                  <option key={status} value={status}>
                    {TASK_STATUS_FILTER_LABELS[status]}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority-filter">Prioridad</Label>
              <Select
                id="task-priority-filter"
                className="bg-background/70"
                value={filters.priority}
                onChange={(event) => {
                  if (isTaskPriorityFilter(event.target.value)) {
                    updateFilter("priority", event.target.value);
                  }
                }}
              >
                {TASK_PRIORITY_FILTERS.map((priority) => (
                  <option key={priority} value={priority}>
                    {TASK_PRIORITY_FILTER_LABELS[priority]}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setFilters(DEFAULT_TASK_FILTERS)}
                disabled={!hasFilters}
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Limpiar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No encontramos tareas"
          description="Probá ajustar la búsqueda o limpiar los filtros."
          action={
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setFilters(DEFAULT_TASK_FILTERS)}
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Limpiar filtros
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4" aria-live="polite">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
