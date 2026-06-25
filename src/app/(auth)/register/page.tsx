import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata = {
  title: "Crear cuenta | TaskFlow",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      description="Registrate para empezar a usar TaskFlow."
    >
      <RegisterForm />
    </AuthCard>
  );
}
