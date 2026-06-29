import { describe, expect, it } from "vitest";

import {
  applyThemePreference,
  getResolvedTheme,
  isThemePreference,
} from "@/features/settings/utils/theme";

describe("theme utils", () => {
  it("validates supported theme preferences", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("system")).toBe(true);
    expect(isThemePreference("claro")).toBe(false);
  });

  it("resolves system preference from the current device setting", () => {
    expect(getResolvedTheme("system", true)).toBe(true);
    expect(getResolvedTheme("system", false)).toBe(false);
    expect(getResolvedTheme("dark", false)).toBe(true);
    expect(getResolvedTheme("light", true)).toBe(false);
  });

  it("applies the dark class to the document element", () => {
    const element = document.createElement("html");

    applyThemePreference("dark", false, element);
    expect(element).toHaveClass("dark");

    applyThemePreference("light", true, element);
    expect(element).not.toHaveClass("dark");
  });
});
