import { redirect } from "next/navigation";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { DashboardSummary } from "@/features/dashboard/components/dashboard-summary";
import { getDashboardStats } from "@/features/dashboard/services/dashboard-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Inicio | TaskFlow",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const statsResult = await getDashboardStats(supabase, user.id)
    .then((stats) => ({ stats, error: null }))
    .catch((error: unknown) => ({
      stats: null,
      error:
        error instanceof Error
          ? error.message
          : "No pudimos cargar el resumen de tareas.",
    }));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Inicio</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Resumen de tus tareas personales.
        </p>
      </div>
      {statsResult.stats ? (
        <DashboardSummary stats={statsResult.stats} />
      ) : (
        <FeedbackMessage tone="error">{statsResult.error}</FeedbackMessage>
      )}
    </section>
  );
}
