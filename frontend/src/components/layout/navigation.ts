import { Columns3, Settings, SquareCheckBig } from "lucide-react";

export const APP_NAVIGATION_ITEMS = [
  {
    title: "Tablero",
    href: "/board",
    icon: Columns3,
  },
  {
    title: "Tareas",
    href: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
] as const;
