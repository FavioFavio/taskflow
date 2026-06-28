import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TaskCard } from "@/features/tasks/components/task-card";
import type { Task } from "@/features/tasks/types/task";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold tracking-normal">
            Todavía no hay tareas
          </h3>
          <CardDescription>
            Creá tu primera tarea para empezar a organizar tu trabajo.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
