import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { UserMenu } from "@/components/layout/user-menu";

type AppHeaderProps = {
  userEmail: string;
};

export function AppHeader({ userEmail }: AppHeaderProps) {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNavigation />
        <div className="min-w-0">
          <p className="text-sm font-medium lg:hidden">TaskFlow</p>
          <p className="text-muted-foreground truncate text-sm">{userEmail}</p>
        </div>
      </div>
      <UserMenu email={userEmail} />
    </header>
  );
}
