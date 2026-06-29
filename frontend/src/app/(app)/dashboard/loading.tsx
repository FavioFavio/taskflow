import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="space-y-6" aria-label="Cargando inicio">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["total", "pendientes", "en-proceso", "completadas"].map((item) => (
          <div key={item} className="bg-card rounded-lg border p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="size-4 rounded-full" />
            </div>
            <Skeleton className="h-9 w-14" />
          </div>
        ))}
      </div>

      <Skeleton className="h-24 w-full" />
    </section>
  );
}
