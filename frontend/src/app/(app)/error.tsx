"use client";

import { RefreshCcw } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { Button } from "@/components/ui/button";

type AppErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppErrorPage({ reset }: AppErrorPageProps) {
  return (
    <section className="space-y-4" aria-labelledby="app-error-title">
      <div>
        <h2 id="app-error-title" className="text-2xl font-semibold">
          Algo salió mal
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          No pudimos cargar esta sección. Intentá nuevamente en unos segundos.
        </p>
      </div>
      <FeedbackMessage tone="error">
        Ocurrió un problema inesperado. No se expuso ningún detalle técnico.
      </FeedbackMessage>
      <Button type="button" onClick={reset}>
        <RefreshCcw className="size-4" aria-hidden="true" />
        Reintentar
      </Button>
    </section>
  );
}
