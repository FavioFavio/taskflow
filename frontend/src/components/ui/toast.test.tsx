import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToastProvider, useToast } from "@/components/ui/toast";

function ToastTrigger({
  message = "Tarea creada.",
  tone,
}: {
  message?: string;
  tone?: "error" | "success";
}) {
  const { showToast } = useToast();

  return (
    <button type="button" onClick={() => showToast({ message, tone })}>
      Mostrar notificación
    </button>
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("ToastProvider", () => {
  it("shows success notifications with an accessible status role", () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar notificación" }),
    );

    expect(screen.getByRole("status")).toHaveTextContent("Tarea creada.");
    expect(
      screen.getByRole("button", { name: "Cerrar notificación" }),
    ).toBeInTheDocument();
  });

  it("shows error notifications with an alert role", () => {
    render(
      <ToastProvider>
        <ToastTrigger message="No pudimos guardar la tarea." tone="error" />
      </ToastProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar notificación" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "No pudimos guardar la tarea.",
    );
  });

  it("dismisses notifications manually and after the timeout", () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar notificación" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Cerrar notificación" }),
    );

    expect(screen.queryByText("Tarea creada.")).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar notificación" }),
    );
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText("Tarea creada.")).not.toBeInTheDocument();
  });
});
