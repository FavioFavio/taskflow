import { Columns3, Settings, SquareCheckBig } from "lucide-react";

export const APP_NAVIGATION_ITEMS = [
  {
    title: "Tablero",
    description: "Visualizá tus tareas agrupadas por estado.",
    href: "/board",
    icon: Columns3,
  },
  {
    title: "Tareas",
    description: "Administrá tus tareas personales.",
    href: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Configuración",
    description: "Opciones de la cuenta y preferencias de uso.",
    href: "/settings",
    icon: Settings,
  },
] as const;
