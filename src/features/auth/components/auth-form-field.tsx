import { type UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormFieldProps = {
  autoComplete: string;
  error?: string;
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  type: "email" | "password";
};

export function AuthFormField({
  autoComplete,
  error,
  id,
  label,
  registration,
  type,
}: AuthFormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        {...registration}
      />
      {error ? (
        <p id={errorId} className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
