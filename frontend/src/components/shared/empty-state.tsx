import type { LucideIcon } from "lucide-react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  action?: React.ReactNode;
  className?: string;
  description: string;
  icon: LucideIcon;
  title: string;
};

export function EmptyState({
  action,
  className,
  description,
  icon: Icon,
  title,
}: EmptyStateProps) {
  return (
    <Card
      className={cn("border-primary/20 bg-accent/20 border-dashed", className)}
    >
      <CardHeader className="items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-normal">{title}</h3>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
        {action ? <div className="w-full sm:w-auto">{action}</div> : null}
      </CardHeader>
    </Card>
  );
}
