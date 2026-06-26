import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions/auth-actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard | TaskFlow",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="bg-background min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-medium">TaskFlow</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              Salir
            </Button>
          </form>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-lg border p-6">
          <h1 className="text-2xl font-semibold tracking-normal">
            Bienvenido a TaskFlow
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            La autenticacion esta lista. El dashboard funcional empieza en el
            siguiente sprint.
          </p>
        </div>
      </section>
    </main>
  );
}
