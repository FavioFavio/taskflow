import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeaderActions } from "@/components/layout/header-actions";

vi.mock("@/features/tasks/components/task-form-dialog", () => ({
  TaskFormDialog: () => <button type="button">Agregar tarea</button>,
}));

afterEach(() => {
  cleanup();
});

describe("HeaderActions", () => {
  it("always renders the new task action", () => {
    render(<HeaderActions />);

    expect(
      screen.getByRole("button", { name: "Agregar tarea" }),
    ).toBeInTheDocument();
  });
});
