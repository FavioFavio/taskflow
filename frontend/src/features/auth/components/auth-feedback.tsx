import { cn } from "@/lib/utils";

type AuthFeedbackProps = {
  children: React.ReactNode;
  tone: "error" | "success";
};

export function AuthFeedback({ children, tone }: AuthFeedbackProps) {
  return (
    <p
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        tone === "error"
          ? "text-destructive border-destructive/30 bg-destructive/10"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
