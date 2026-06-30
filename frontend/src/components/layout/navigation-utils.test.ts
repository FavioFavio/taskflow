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
    expect(getCurrentNavigationItem("/dashboard").title).toBe("Inicio");
    expect(getCurrentNavigationItem("/tasks").title).toBe("Tareas");
    expect(getCurrentNavigationItem("/board").title).toBe("Tablero");
    expect(getCurrentNavigationItem("/settings").title).toBe("Configuración");
  });

  it("falls back to Inicio for unknown authenticated routes", () => {
    expect(getCurrentNavigationItem("/unknown").title).toBe("Inicio");
  });
});
