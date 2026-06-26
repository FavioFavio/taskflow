"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { loginAction } from "../actions/auth-actions";
import { loginSchema, type LoginValues } from "../schemas/auth-schema";
import { AuthFeedback } from "./auth-feedback";
import { AuthFormField } from "./auth-form-field";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    setFormError(null);
    startTransition(async () => {
      const result = await loginAction({ ...values, next: nextPath });
      if (result?.error) {
        setFormError(result.error);
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
        autoComplete="current-password"
        error={errors.password?.message}
        registration={register("password")}
      />
      {formError ? (
        <AuthFeedback tone="error">{formError}</AuthFeedback>
      ) : null}
      <Button type="submit" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Ingresando..." : "Ingresar"}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        No tenes cuenta?{" "}
        <Link className="text-foreground font-medium underline" href="/register">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
