import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeSelector } from "@/features/settings/components/theme-selector";
import { THEME_STORAGE_KEY } from "@/features/settings/utils/theme";

function mockMatchMedia(matches: boolean) {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      addEventListener,
      matches,
      removeEventListener,
    })),
  });

  return { addEventListener, removeEventListener };
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ThemeSelector", () => {
  it("persists the selected theme and applies it", () => {
    render(<ThemeSelector />);

    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "dark" },
    });

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("loads a persisted light theme", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
    document.documentElement.classList.add("dark");

    render(<ThemeSelector />);

    expect(screen.getByLabelText("Tema")).toHaveValue("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
