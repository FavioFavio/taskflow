import { redirect } from "next/navigation";
import {
  CalendarDays,
  Globe2,
  LogOut,
  Mail,
  Palette,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { logoutAction } from "@/features/auth/actions/auth-actions";
import { LanguageSelector } from "@/features/settings/components/language-selector";
import { PasswordResetButton } from "@/features/settings/components/password-reset-button";
import { ThemeSelector } from "@/features/settings/components/theme-selector";
import { createClient } from "@/lib/supabase/server";
import packageJson from "../../../../package.json";

export const metadata = {
  title: "Configuración | TaskFlow",
};

function formatAccountDate(value?: string) {
  if (!value) {
    return "No disponible";
  }

  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeZone: "America/Buenos_Aires",
  }).format(new Date(value));
}

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const accountCreatedAt = formatAccountDate(user.created_at);

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card className="border-primary/10">
            <CardHeader>
              <h3 className="text-lg font-semibold tracking-normal">Cuenta</h3>
              <CardDescription>
                Información básica de tu sesión actual.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="bg-background/60 rounded-md border p-4">
                  <dt className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Mail className="text-primary size-4" aria-hidden="true" />
                    Correo electrónico
                  </dt>
                  <dd className="mt-2 text-sm font-medium break-words">
                    {user.email ?? "No disponible"}
                  </dd>
                </div>
                <div className="bg-background/60 rounded-md border p-4">
                  <dt className="text-muted-foreground flex items-center gap-2 text-sm">
                    <CalendarDays
                      className="text-primary size-4"
                      aria-hidden="true"
                    />
                    Cuenta creada
                  </dt>
                  <dd className="mt-2 text-sm font-medium">
                    {accountCreatedAt}
                  </dd>
                </div>
              </dl>

              <form action={logoutAction}>
                <Button type="submit" variant="outline">
                  <LogOut className="size-4" aria-hidden="true" />
                  Cerrar sesión
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-normal">
                <Palette className="text-primary size-5" aria-hidden="true" />
                Apariencia
              </h3>
              <CardDescription>
                Elegí cómo querés ver TaskFlow en este dispositivo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-normal">
                <Globe2 className="text-primary size-5" aria-hidden="true" />
                Aplicación
              </h3>
              <CardDescription>
                Preferencias generales e información de la versión instalada.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <LanguageSelector />
              <div className="space-y-2">
                <p className="text-sm font-medium">Versión</p>
                <p className="text-muted-foreground text-sm">
                  TaskFlow {packageJson.version}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/10 bg-accent/30 h-fit">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-normal">
              <ShieldCheck className="text-primary size-5" aria-hidden="true" />
              Seguridad
            </h3>
            <CardDescription>
              Solicitá un correo para restablecer tu contraseña mediante el
              flujo de Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordResetButton />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
