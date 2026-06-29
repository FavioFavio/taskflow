import { THEME_STORAGE_KEY } from "@/features/settings/utils/theme";

export function ThemeScript() {
  const storageKey = JSON.stringify(THEME_STORAGE_KEY);
  const code = `
try {
  var theme = localStorage.getItem(${storageKey}) || "system";
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var useDark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", useDark);
} catch (_) {}
`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
