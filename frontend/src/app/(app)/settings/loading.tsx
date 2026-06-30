import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <section className="space-y-6" aria-label="Cargando configuración">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
            <Skeleton className="mt-5 h-8 w-32" />
          </div>

          <div className="rounded-lg border p-6">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/30 h-fit rounded-lg border p-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </section>
  );
}
