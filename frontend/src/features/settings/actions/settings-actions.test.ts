import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import { sendPasswordResetAction } from "@/features/settings/actions/settings-actions";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

const supabaseMock = {
  auth: {
    getUser: vi.fn(),
    resetPasswordForEmail: vi.fn(),
  },
};

describe("settings actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockResolvedValue(supabaseMock);
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { email: "usuario@taskflow.test" } },
    });
    supabaseMock.auth.resetPasswordForEmail.mockResolvedValue({ error: null });
  });

  it("sends a password reset email to the authenticated user", async () => {
    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      success:
        "Te enviamos un correo con las instrucciones para restablecer tu contraseña.",
    });
    expect(supabaseMock.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "usuario@taskflow.test",
    );
  });

  it("returns a friendly error when there is no authenticated email", async () => {
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: null },
    });

    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      error: "Necesitás iniciar sesión para solicitar el restablecimiento.",
    });
    expect(supabaseMock.auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("does not expose Supabase errors", async () => {
    supabaseMock.auth.resetPasswordForEmail.mockResolvedValue({
      error: { message: "raw auth error" },
    });

    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      error:
        "No pudimos enviar el correo de restablecimiento. Intentá nuevamente.",
    });
  });
});
