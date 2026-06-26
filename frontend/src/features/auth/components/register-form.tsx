"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { registerAction } from "../actions/auth-actions";
import { registerSchema, type RegisterValues } from "../schemas/auth-schema";
import { AuthFeedback } from "./auth-feedback";
import { AuthFormField } from "./auth-form-field";

export function RegisterForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterValues) {
    setFormError(null);
    setFormMessage(null);
    startTransition(async () => {
      const result = await registerAction(values);
      if (result?.error) {
        setFormError(result.error);
      }
      if (result?.message) {
        setFormMessage(result.message);
      }
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthFormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        registration={register("email")}
      />
      <AuthFormField
        id="password"
        label="Contrasena"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        registration={register("password")}
      />
      {formError ? <AuthFeedback tone="error">{formError}</AuthFeedback> : null}
      {formMessage ? (
        <AuthFeedback tone="success">{formMessage}</AuthFeedback>
      ) : null}
      <Button type="submit" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        Ya tenes cuenta?{" "}
        <Link className="text-foreground font-medium underline" href="/login">
          Iniciar sesion
        </Link>
      </p>
    </form>
  );
}
