import { Breadcrumb } from "@/components/layout/breadcrumb";

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Breadcrumb />
        {children}
      </div>
    </main>
  );
}
