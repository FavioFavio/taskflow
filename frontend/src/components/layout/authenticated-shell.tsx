import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageContainer } from "@/components/layout/page-container";

type AuthenticatedShellProps = {
  children: React.ReactNode;
  userEmail: string;
};

export function AuthenticatedShell({
  children,
  userEmail,
}: AuthenticatedShellProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader userEmail={userEmail} />
          <PageContainer>{children}</PageContainer>
        </div>
      </div>
    </div>
  );
}
