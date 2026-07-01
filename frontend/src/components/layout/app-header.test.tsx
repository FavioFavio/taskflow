import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppHeader } from "@/components/layout/app-header";

const usePathnameMock = vi.fn(() => "/board");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

vi.mock("@/components/layout/mobile-sidebar", () => ({
  MobileSidebar: () => <button type="button">Abrir navegación</button>,
}));

vi.mock("@/components/layout/user-dropdown", () => ({
  UserDropdown: () => (
    <button type="button" aria-label="Abrir menú de usuario" />
  ),
}));

vi.mock("@/features/tasks/components/task-form-dialog", () => ({
  TaskFormDialog: () => <button type="button">Agregar tarea</button>,
}));

afterEach(() => {
  cleanup();
  usePathnameMock.mockReturnValue("/board");
});

describe("AppHeader", () => {
  it("renders the current view title and description", () => {
    render(<AppHeader userEmail="persona@taskflow.test" />);

    expect(
      screen.getByRole("heading", { name: "Tablero" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Visualizá tus tareas agrupadas por estado."),
    ).toBeInTheDocument();
  });

  it("does not render the user email as redundant header text", () => {
    render(<AppHeader userEmail="persona@taskflow.test" />);

    expect(screen.queryByText("persona@taskflow.test")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Abrir menú de usuario" }),
    ).toBeInTheDocument();
  });

  it("renders the new task action in the header", () => {
    usePathnameMock.mockReturnValue("/tasks");

    render(<AppHeader userEmail="persona@taskflow.test" />);

    expect(
      screen.getByRole("button", { name: "Agregar tarea" }),
    ).toBeInTheDocument();
  });

  it("keeps the new task action visible outside tasks", () => {
    render(<AppHeader userEmail="persona@taskflow.test" />);

    expect(
      screen.getByRole("button", { name: "Agregar tarea" }),
    ).toBeInTheDocument();
  });
});
