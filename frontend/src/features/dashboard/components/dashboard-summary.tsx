import { CheckCircle2, CircleDashed, ClipboardList } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";

type DashboardSummaryProps = {
  stats: DashboardStats;
};

const SUMMARY_ITEMS = [
  {
    label: "Total de tareas",
    valueKey: "totalTasks",
    icon: ClipboardList,
  },
  {
    label: "Tareas pendientes",
    valueKey: "pendingTasks",
    icon: CircleDashed,
  },
  {
    label: "Tareas completadas",
    valueKey: "completedTasks",
    icon: CheckCircle2,
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
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SUMMARY_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.label}>
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <dt className="text-muted-foreground text-sm">
                    {item.label}
                  </dt>
                  <Icon
                    className="text-muted-foreground size-4"
                    aria-hidden="true"
                  />
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
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold tracking-normal">
              Todavía no hay tareas
            </h3>
            <CardDescription>
              Cuando tengas tareas registradas, el resumen aparecerá aquí.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}
    </div>
  );
}
