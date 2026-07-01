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
  "No pudimos completar la autenticación. Revisá los datos e intentá otra vez.";
const DEFAULT_AUTH_REDIRECT_PATH = "/board";
const SAFE_AUTH_REDIRECT_PATHS = ["/board", "/tasks", "/settings"] as const;

const loginActionSchema = loginSchema.extend({
  next: z.string().optional(),
});

function getSafeRedirectPath(next?: string) {
  if (next?.startsWith("/dashboard")) {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }

  if (next && SAFE_AUTH_REDIRECT_PATHS.some((path) => next.startsWith(path))) {
    return next;
  }

  return DEFAULT_AUTH_REDIRECT_PATH;
}

export async function loginAction(values: unknown): Promise<AuthActionState> {
  const parsedValues = loginActionSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisá el correo electrónico y la contraseña." };
  }

  const { email, password, next } = parsedValues.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error:
        error.message.toLowerCase().includes("invalid") ||
        error.message.toLowerCase().includes("credentials")
          ? "El correo electrónico o la contraseña no son correctos."
          : DEFAULT_AUTH_ERROR,
    };
  }

  redirect(`${getSafeRedirectPath(next)}?toast=login`);
}

export async function registerAction(
  values: unknown,
): Promise<AuthActionState> {
  const parsedValues = registerSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Revisá el correo electrónico y la contraseña." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsedValues.data);

  if (error) {
    return {
      error: error.message.toLowerCase().includes("already")
        ? "Ya existe una cuenta con ese correo electrónico."
        : DEFAULT_AUTH_ERROR,
    };
  }

  if (data.session) {
    redirect(DEFAULT_AUTH_REDIRECT_PATH);
  }

  return {
    message:
      "Cuenta creada. Revisá tu correo electrónico para confirmar el registro antes de iniciar sesión.",
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login?toast=logout");
}
