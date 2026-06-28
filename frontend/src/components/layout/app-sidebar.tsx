import Link from "next/link";

import { AppNavigationLinks } from "@/components/layout/app-navigation-links";

export function AppSidebar() {
  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border hidden min-h-screen w-64 border-r lg:block">
      <div className="border-sidebar-border flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-base font-semibold">
          TaskFlow
        </Link>
      </div>
      <nav className="space-y-1 px-3 py-4" aria-label="Navegación principal">
        <AppNavigationLinks
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
          inactiveClassName="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        />
      </nav>
    </aside>
  );
}
