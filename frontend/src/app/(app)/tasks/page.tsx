import { redirect } from "next/navigation";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog";
import { TaskList } from "@/features/tasks/components/task-list";
import { listUserTasks } from "@/features/tasks/services/task-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Tareas | TaskFlow",
};

export default async function TasksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tasksResult = await listUserTasks(supabase, user.id)
    .then((tasks) => ({ tasks, error: null }))
    .catch((error: unknown) => ({
      tasks: [],
      error:
        error instanceof Error
          ? error.message
          : "No pudimos cargar tus tareas.",
    }));

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">Tareas</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Administrá tus tareas personales.
          </p>
        </div>
        <TaskFormDialog />
      </div>

      {tasksResult.error ? (
        <FeedbackMessage tone="error">{tasksResult.error}</FeedbackMessage>
      ) : (
        <TaskList tasks={tasksResult.tasks} />
      )}
    </section>
  );
}
