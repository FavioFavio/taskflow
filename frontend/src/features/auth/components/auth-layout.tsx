import { ClipboardCheck } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
        <section className="hidden lg:block">
          <div className="bg-primary/10 text-primary mb-5 flex size-12 items-center justify-center rounded-lg">
            <ClipboardCheck className="size-6" aria-hidden="true" />
          </div>
          <p className="text-primary mb-3 text-sm font-semibold">TaskFlow</p>
          <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-normal">
            Gestioná tu trabajo con una sesión segura y persistente.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg text-base leading-7">
            Accedé a tu espacio personal para organizar tareas y prioridades
            desde cualquier dispositivo.
          </p>
        </section>
        {children}
      </div>
    </main>
  );
}
