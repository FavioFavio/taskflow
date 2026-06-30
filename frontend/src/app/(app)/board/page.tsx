import { redirect } from "next/navigation";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { TaskBoard } from "@/features/tasks/components/task-board";
import { listUserTasks } from "@/features/tasks/services/task-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Tablero | TaskFlow",
};

export default async function BoardPage() {
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
          : "No pudimos cargar tu tablero.",
    }));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Tablero</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Visualizá tus tareas agrupadas por estado.
        </p>
      </div>

      {tasksResult.error ? (
        <FeedbackMessage tone="error">{tasksResult.error}</FeedbackMessage>
      ) : (
        <TaskBoard tasks={tasksResult.tasks} />
      )}
    </section>
  );
}
