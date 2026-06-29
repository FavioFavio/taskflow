import { CheckCircle2, CircleDashed, ClipboardList, Timer } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";

type DashboardSummaryProps = {
  stats: DashboardStats;
};

const SUMMARY_ITEMS = [
  {
    label: "Total de tareas",
    valueKey: "totalTasks",
    icon: ClipboardList,
    accentClassName: "bg-primary/10 text-primary",
    cardClassName:
      "border-t-primary/70 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--primary),transparent_91%)_100%)]",
  },
  {
    label: "Tareas pendientes",
    valueKey: "pendingTasks",
    icon: CircleDashed,
    accentClassName: "bg-warning/15 text-warning-foreground dark:text-warning",
    cardClassName:
      "border-t-warning/80 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--warning),transparent_88%)_100%)]",
  },
  {
    label: "Tareas en proceso",
    valueKey: "inProgressTasks",
    icon: Timer,
    accentClassName: "bg-accent text-accent-foreground",
    cardClassName:
      "border-t-accent-foreground/60 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--accent),transparent_55%)_100%)]",
  },
  {
    label: "Tareas completadas",
    valueKey: "completedTasks",
    icon: CheckCircle2,
    accentClassName: "bg-success/10 text-success",
    cardClassName:
      "border-t-success/70 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_oklch,var(--success),transparent_90%)_100%)]",
  },
] as const;

export function DashboardSummary({ stats }: DashboardSummaryProps) {
  const hasTasks = stats.totalTasks > 0;

  return (
    <div className="space-y-6">
      <section aria-labelledby="dashboard-summary-title">
        <h3 id="dashboard-summary-title" className="sr-only">
          Resumen de tareas
        </h3>
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SUMMARY_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className={cn(
                  "hover:border-primary/30 overflow-hidden border-t-4 transition-colors",
                  item.cardClassName,
                )}
              >
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <dt className="text-muted-foreground text-sm">
                    {item.label}
                  </dt>
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-md",
                      item.accentClassName,
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                </CardHeader>
                <CardContent>
                  <dd className="text-3xl font-semibold tabular-nums">
                    {stats[item.valueKey]}
                  </dd>
                </CardContent>
              </Card>
            );
          })}
        </dl>
      </section>

      {!hasTasks ? (
        <EmptyState
          icon={ClipboardList}
          title="Todavía no hay tareas"
          description="Cuando tengas tareas registradas, el resumen aparecerá aquí."
        />
      ) : null}
    </div>
  );
}
