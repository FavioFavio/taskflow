import {
  Columns3,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
} from "lucide-react";

export const APP_NAVIGATION_ITEMS = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tareas",
    href: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Tablero",
    href: "/board",
    icon: Columns3,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
] as const;
