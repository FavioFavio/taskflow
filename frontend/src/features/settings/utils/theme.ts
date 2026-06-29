export const THEME_STORAGE_KEY = "taskflow-theme";

export const THEME_OPTIONS = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof THEME_OPTIONS)[number];

export const THEME_LABELS: Record<ThemePreference, string> = {
  light: "Claro",
  dark: "Oscuro",
  system: "Sistema",
};

export function isThemePreference(value: string): value is ThemePreference {
  return (THEME_OPTIONS as readonly string[]).includes(value);
}

export function getResolvedTheme(theme: ThemePreference, prefersDark: boolean) {
  return theme === "system" ? prefersDark : theme === "dark";
}

export function applyThemePreference(
  theme: ThemePreference,
  prefersDark: boolean,
  element: HTMLElement,
) {
  element.classList.toggle("dark", getResolvedTheme(theme, prefersDark));
}
