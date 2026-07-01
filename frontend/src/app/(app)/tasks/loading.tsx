import { Skeleton } from "@/components/ui/skeleton";

export default function TasksLoading() {
  return (
    <section className="space-y-6" aria-label="Cargando tareas">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-8 w-full sm:w-32" />
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

      <div className="rounded-lg border p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>

      <div className="grid gap-4">
        {["uno", "dos", "tres"].map((item) => (
          <div key={item} className="rounded-lg border p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-56 max-w-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-8 w-36" />
            </div>
            <Skeleton className="mb-4 h-4 w-full" />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Skeleton className="h-8 w-full sm:w-24" />
              <Skeleton className="h-8 w-full sm:w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
