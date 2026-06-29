import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Ingresá un correo electrónico válido."),
  password: z.string().min(1, "Ingresá tu contraseña."),
});

export const registerSchema = z.object({
  email: z.email("Ingresá un correo electrónico válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(/[A-Z]/, "Incluí al menos una mayúscula.")
    .regex(/[a-z]/, "Incluí al menos una minúscula.")
    .regex(/[0-9]/, "Incluí al menos un número."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
