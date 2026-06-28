"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_NAVIGATION_ITEMS } from "@/components/layout/navigation";
import { isNavigationItemActive } from "@/components/layout/navigation-utils";
import { cn } from "@/lib/utils";

type AppNavigationLinksProps = {
  activeClassName: string;
  inactiveClassName: string;
  wrapLink?: (link: ReactNode, href: string) => ReactNode;
};

export function AppNavigationLinks({
  activeClassName,
  inactiveClassName,
  wrapLink,
}: AppNavigationLinksProps) {
  const pathname = usePathname();

  return APP_NAVIGATION_ITEMS.map((item) => {
    const isActive = isNavigationItemActive(pathname, item.href);
    const Icon = item.icon;
    const link = (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
          isActive ? activeClassName : inactiveClassName,
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
        {item.title}
      </Link>
    );

    return wrapLink ? wrapLink(link, item.href) : link;
  });
}
