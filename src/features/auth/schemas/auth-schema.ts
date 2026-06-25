import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Ingresa un email valido."),
  password: z.string().min(1, "Ingresa tu contrasena."),
});

export const registerSchema = z.object({
  email: z.email("Ingresa un email valido."),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres.")
    .regex(/[A-Z]/, "Inclui al menos una mayuscula.")
    .regex(/[a-z]/, "Inclui al menos una minuscula.")
    .regex(/[0-9]/, "Inclui al menos un numero."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
