import type { LucideIcon } from "lucide-react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

type FeedbackTone = "error" | "success";

type FeedbackMessageProps = {
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  tone: FeedbackTone;
};

export function FeedbackMessage({
  children,
  className,
  icon,
  tone,
}: FeedbackMessageProps) {
  const Icon = icon ?? (tone === "error" ? AlertCircle : CheckCircle2);

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
        tone === "error"
          ? "text-destructive border-destructive/30 bg-destructive/10"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        className,
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}
