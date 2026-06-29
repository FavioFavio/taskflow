import { Settings } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

export const metadata = {
  title: "Configuración | TaskFlow",
};

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">
          Configuración
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Opciones de la cuenta y preferencias de uso.
        </p>
      </div>
      <EmptyState
        icon={Settings}
        title="Configuración no disponible"
        description="Las opciones de la cuenta estarán disponibles próximamente."
      />
    </section>
  );
}
