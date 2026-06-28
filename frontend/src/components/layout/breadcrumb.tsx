"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { getCurrentNavigationItem } from "@/components/layout/navigation-utils";

export function Breadcrumb() {
  const pathname = usePathname();
  const currentItem = getCurrentNavigationItem(pathname);

  return (
    <nav
      className="text-muted-foreground flex items-center gap-1 text-sm"
      aria-label="Ruta de navegación"
    >
      <Link
        href="/dashboard"
        className="hover:text-foreground transition-colors"
      >
        TaskFlow
      </Link>
      <ChevronRight className="size-4" aria-hidden="true" />
      <span className="text-foreground font-medium">{currentItem.title}</span>
    </nav>
  );
}
