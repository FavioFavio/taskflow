import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/10 text-primary dark:border-primary/25 dark:bg-primary/15",
        secondary:
          "border-border bg-secondary text-secondary-foreground dark:border-input",
        success:
          "border-success/25 bg-success/10 text-success dark:border-success/30 dark:bg-success/15",
        warning:
          "border-warning/30 bg-warning/15 text-warning-foreground dark:border-warning/30 dark:bg-warning/20 dark:text-warning",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/15",
        outline:
          "border-border bg-background text-foreground dark:border-input dark:bg-input/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
