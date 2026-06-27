export const metadata = {
  title: "Dashboard | TaskFlow",
};

export default function DashboardPage() {
  return (
    <section className="border-border bg-card text-card-foreground rounded-lg border p-6">
      <h1 className="text-2xl font-semibold tracking-normal">Dashboard</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Your authenticated workspace is ready.
      </p>
    </section>
  );
}
