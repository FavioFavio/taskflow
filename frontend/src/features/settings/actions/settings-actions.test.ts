import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import { sendPasswordResetAction } from "@/features/settings/actions/settings-actions";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

const getUserMock = vi.fn();
const resetPasswordForEmailMock = vi.fn();
const supabaseMock = {
  auth: {
    getUser: getUserMock,
    resetPasswordForEmail: resetPasswordForEmailMock,
  },
} as unknown as Awaited<ReturnType<typeof createClient>>;

describe("settings actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockResolvedValue(supabaseMock);
    getUserMock.mockResolvedValue({
      data: { user: { email: "usuario@taskflow.test" } },
    });
    resetPasswordForEmailMock.mockResolvedValue({ error: null });
  });

  it("sends a password reset email to the authenticated user", async () => {
    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      success:
        "Te enviamos un correo con las instrucciones para restablecer tu contraseña.",
    });
    expect(resetPasswordForEmailMock).toHaveBeenCalledWith(
      "usuario@taskflow.test",
    );
  });

  it("returns a friendly error when there is no authenticated email", async () => {
    getUserMock.mockResolvedValue({
      data: { user: null },
    });

    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      error: "Necesitás iniciar sesión para solicitar el restablecimiento.",
    });
    expect(resetPasswordForEmailMock).not.toHaveBeenCalled();
  });

  it("does not expose Supabase errors", async () => {
    resetPasswordForEmailMock.mockResolvedValue({
      error: { message: "raw auth error" },
    });

    const result = await sendPasswordResetAction();

    expect(result).toEqual({
      error:
        "No pudimos enviar el correo de restablecimiento. Intentá nuevamente.",
    });
  });
});
