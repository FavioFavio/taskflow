import { describe, expect, it } from "vitest";

import {
  getCurrentNavigationItem,
  isNavigationItemActive,
} from "@/components/layout/navigation-utils";

describe("navigation utils", () => {
  it("detects active navigation items for exact and nested routes", () => {
    expect(isNavigationItemActive("/tasks", "/tasks")).toBe(true);
    expect(isNavigationItemActive("/tasks/123", "/tasks")).toBe(true);
    expect(isNavigationItemActive("/settings", "/tasks")).toBe(false);
  });

  it("returns the Spanish title for the current route", () => {
    expect(getCurrentNavigationItem("/board").title).toBe("Tablero");
    expect(getCurrentNavigationItem("/tasks").title).toBe("Tareas");
    expect(getCurrentNavigationItem("/settings").title).toBe("Configuración");
  });

  it("returns the Spanish description for the current route", () => {
    expect(getCurrentNavigationItem("/board").description).toBe(
      "Visualizá tus tareas agrupadas por estado.",
    );
    expect(getCurrentNavigationItem("/tasks").description).toBe(
      "Administrá tus tareas personales.",
    );
    expect(getCurrentNavigationItem("/settings").description).toBe(
      "Opciones de la cuenta y preferencias de uso.",
    );
  });

  it("falls back to Tablero for unknown authenticated routes", () => {
    expect(getCurrentNavigationItem("/unknown").title).toBe("Tablero");
  });
});
