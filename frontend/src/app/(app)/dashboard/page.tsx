import { redirect } from "next/navigation";

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

  const stats = await getDashboardStats(supabase, user.id);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Inicio</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Resumen de tus tareas personales.
        </p>
      </div>
      <DashboardSummary stats={stats} />
    </section>
  );
}
