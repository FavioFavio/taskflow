"use server";

import { createClient } from "@/lib/supabase/server";

export type PasswordResetActionState = {
  error?: string;
  success?: string;
};

export async function sendPasswordResetAction(): Promise<PasswordResetActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return {
      error: "Necesitás iniciar sesión para solicitar el restablecimiento.",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(user.email);

  if (error) {
    return {
      error:
        "No pudimos enviar el correo de restablecimiento. Intentá nuevamente.",
    };
  }

  return {
    success:
      "Te enviamos un correo con las instrucciones para restablecer tu contraseña.",
  };
}
