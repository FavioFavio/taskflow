import { redirect } from "next/navigation";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { TaskList } from "@/features/tasks/components/task-list";
import { TaskSummary } from "@/features/tasks/components/task-summary";
import { listUserTasks } from "@/features/tasks/services/task-service";
import { getTaskStats } from "@/features/tasks/utils/task-stats";
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
  const taskStats = getTaskStats(tasksResult.tasks);

  return (
    <section className="space-y-6">
      {tasksResult.error ? (
        <FeedbackMessage tone="error">{tasksResult.error}</FeedbackMessage>
      ) : (
        <>
          <TaskSummary stats={taskStats} />
          <TaskList tasks={tasksResult.tasks} />
        </>
      )}
    </section>
  );
}
