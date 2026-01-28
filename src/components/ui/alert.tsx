import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card/50 text-card-foreground border-border/40 shadow-sm",
        destructive:
          "text-destructive bg-destructive/15 border-destructive/40 *:data-[slot=alert-description]:text-destructive/90 dark:bg-destructive/5 dark:border-destructive/20 [&>svg]:text-current",
        warning:
          "border-yellow-400 bg-yellow-50 text-yellow-800 *:data-[slot=alert-description]:text-yellow-800/90 dark:border-yellow-500/30 dark:bg-yellow-500/5 dark:text-yellow-300 dark:*:data-[slot=alert-description]:text-yellow-300/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-foreground col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight",
        className,
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-foreground/80 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
