import * as React from "react";

import { cn } from "@/lib/utils";

const SELECT_CHEVRON_BACKGROUND =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M6 8l4 4 4-4' stroke='%236b7280' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")";

function Select({
  className,
  style,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input bg-background focus-visible:border-primary focus-visible:ring-ring flex h-10 w-full appearance-none rounded-md border py-2 pr-10 pl-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      style={{
        backgroundImage: SELECT_CHEVRON_BACKGROUND,
        backgroundPosition: "right 0.875rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1rem",
        ...style,
      }}
      {...props}
    />
  );
}

export { Select };
