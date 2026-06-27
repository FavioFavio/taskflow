import { LayoutDashboard, Settings, SquareCheckBig } from "lucide-react";

export const APP_NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;
