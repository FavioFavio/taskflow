"use client";

import { useState, useTransition } from "react";
import { KeyRound, Loader2 } from "lucide-react";

import { FeedbackMessage } from "@/components/shared/feedback-message";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { sendPasswordResetAction } from "@/features/settings/actions/settings-actions";

export function PasswordResetButton() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function onSendResetEmail() {
    setError(null);
    startTransition(async () => {
      const result = await sendPasswordResetAction();

      if (result.error) {
        setError(result.error);
        return;
      }

      showToast({
        message:
          result.success ??
          "Te enviamos un correo para restablecer tu contraseña.",
      });
    });
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        onClick={onSendResetEmail}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <KeyRound className="size-4" aria-hidden="true" />
        )}
        {isPending ? "Enviando..." : "Enviar correo de restablecimiento"}
      </Button>
      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}
    </div>
  );
}
