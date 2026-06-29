"use client";

import { useEffect, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  applyThemePreference,
  isThemePreference,
  THEME_LABELS,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/features/settings/utils/theme";

function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme && isThemePreference(storedTheme) ? storedTheme : "system";
}

function getPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeSelector() {
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredTheme());
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
    applyThemePreference(theme, getPrefersDark(), document.documentElement);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function onSystemThemeChange(event: MediaQueryListEvent) {
      applyThemePreference(
        themeRef.current,
        event.matches,
        document.documentElement,
      );
    }

    mediaQuery.addEventListener("change", onSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", onSystemThemeChange);
    };
  }, []);

  function onThemeChange(value: string) {
    if (!isThemePreference(value)) {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, value);
    setTheme(value);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="theme-selector">Tema</Label>
      <Select
        id="theme-selector"
        value={theme}
        onChange={(event) => onThemeChange(event.target.value)}
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {THEME_LABELS[option]}
          </option>
        ))}
      </Select>
    </div>
  );
}
