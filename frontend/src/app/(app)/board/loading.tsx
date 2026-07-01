import { Skeleton } from "@/components/ui/skeleton";

const columns = ["pendientes", "en-proceso", "completadas"];
const cards = ["uno", "dos", "tres"];

export default function BoardLoading() {
  return (
    <section className="space-y-6" aria-label="Cargando tablero">
      <div
        className="overflow-x-auto pb-2 md:overflow-visible"
        role="region"
        aria-label="Columnas del tablero"
        tabIndex={0}
      >
        <div className="grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-4 md:grid-flow-row md:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column}
              className="bg-card/80 h-full overflow-hidden rounded-lg border shadow-sm shadow-slate-950/5 dark:shadow-black/20"
            >
              <div className="border-border/70 border-b p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Skeleton className="size-9 rounded-md" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <Skeleton className="h-6 w-8 rounded-md" />
                </div>
              </div>

              <div className="space-y-3 p-3">
                {cards.map((card) => (
                  <div
                    key={`${column}-${card}`}
                    className="rounded-lg border border-l-4 p-4"
                  >
                    <div className="mb-3 flex items-start gap-2">
                      <Skeleton className="size-7 rounded-md" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-5 w-40 max-w-full" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-5 w-24 rounded-md" />
                          <Skeleton className="h-5 w-28 rounded-md" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="mb-3 h-4 w-full" />
                    <Skeleton className="h-7 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
