export const metadata = {
  title: "Inicio | TaskFlow",
};

export default function DashboardPage() {
  return (
    <section className="border-border bg-card text-card-foreground rounded-lg border p-6">
      <h2 className="text-2xl font-semibold tracking-normal">Inicio</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Tu espacio autenticado está listo.
      </p>
    </section>
  );
}
