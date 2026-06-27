"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_NAVIGATION_ITEMS } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border hidden min-h-screen w-64 border-r lg:block">
      <div className="border-sidebar-border flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-base font-semibold">
          TaskFlow
        </Link>
      </div>
      <nav className="space-y-1 px-3 py-4" aria-label="Main navigation">
        {APP_NAVIGATION_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
