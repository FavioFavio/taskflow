import { redirect } from "next/navigation";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { TaskBoard } from "@/features/tasks/components/task-board";
import { listUserTasks } from "@/features/tasks/services/task-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Tablero | TaskFlow",
};

function getTaskBoardVersion(tasks: Awaited<ReturnType<typeof listUserTasks>>) {
  return tasks
    .map((task) =>
      [
        task.id,
        task.title,
        task.priority,
        task.status,
        task.completedAt,
        task.createdAt,
      ].join(":"),
    )
    .join("|");
}

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
      {tasksResult.error ? (
        <FeedbackMessage tone="error">{tasksResult.error}</FeedbackMessage>
      ) : (
        <TaskBoard
          key={getTaskBoardVersion(tasksResult.tasks)}
          tasks={tasksResult.tasks}
        />
      )}
    </section>
  );
}
