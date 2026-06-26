"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "../schemas/auth-schema";

export type AuthActionState = {
  error?: string;
  message?: string;
};

const DEFAULT_AUTH_ERROR =
  "No pudimos completar la autenticacion. Revisa los datos e intenta otra vez.";

const loginActionSchema = loginSchema.extend({
  next: z.string().optional(),
});

function getSafeRedirectPath(next?: string) {
  if (next?.startsWith("/dashboard")) {
    return next;
  }

  return "/dashboard";
}

export async function loginAction(
  values: unknown
): Promise<AuthActionState> {
  const parsedValues = loginActionSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisa el email y la contrasena." };
  }

  const { email, password, next } = parsedValues.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error:
        error.message.toLowerCase().includes("invalid") ||
        error.message.toLowerCase().includes("credentials")
          ? "El email o la contrasena no son correctos."
          : DEFAULT_AUTH_ERROR,
    };
  }

  redirect(getSafeRedirectPath(next));
}

export async function registerAction(
  values: unknown
): Promise<AuthActionState> {
  const parsedValues = registerSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisa el email y la contrasena." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsedValues.data);

  if (error) {
    return {
      error:
        error.message.toLowerCase().includes("already")
          ? "Ya existe una cuenta con ese email."
          : DEFAULT_AUTH_ERROR,
    };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  return {
    message:
      "Cuenta creada. Revisa tu email para confirmar el registro antes de iniciar sesion.",
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
