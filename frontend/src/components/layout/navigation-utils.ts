import { APP_NAVIGATION_ITEMS } from "@/components/layout/navigation";

export type AppNavigationItem = (typeof APP_NAVIGATION_ITEMS)[number];

export function isNavigationItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getCurrentNavigationItem(pathname: string): AppNavigationItem {
  return (
    APP_NAVIGATION_ITEMS.find((item) =>
      isNavigationItemActive(pathname, item.href),
    ) ?? APP_NAVIGATION_ITEMS[0]
  );
}
