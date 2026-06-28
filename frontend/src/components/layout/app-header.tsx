"use client";

import { usePathname } from "next/navigation";

import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { getCurrentNavigationItem } from "@/components/layout/navigation-utils";
import { UserDropdown } from "@/components/layout/user-dropdown";

type AppHeaderProps = {
  userEmail: string;
};

export function AppHeader({ userEmail }: AppHeaderProps) {
  const pathname = usePathname();
  const currentItem = getCurrentNavigationItem(pathname);

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileSidebar />
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">
            {currentItem.title}
          </h1>
          <p className="text-muted-foreground truncate text-sm">{userEmail}</p>
        </div>
      </div>
      <UserDropdown email={userEmail} />
    </header>
  );
}
