"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { APP_NAVIGATION_ITEMS } from "@/components/layout/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const currentItem =
    APP_NAVIGATION_ITEMS.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ) ?? APP_NAVIGATION_ITEMS[0];

  return (
    <nav
      className="text-muted-foreground flex items-center gap-1 text-sm"
      aria-label="Breadcrumb"
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
