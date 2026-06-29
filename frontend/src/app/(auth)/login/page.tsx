import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata = {
  title: "Iniciar sesión | TaskFlow",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <AuthCard
      title="Iniciar sesión"
      description="Usá tu cuenta para volver a tu espacio de trabajo."
    >
      <LoginForm nextPath={next} />
    </AuthCard>
  );
}
