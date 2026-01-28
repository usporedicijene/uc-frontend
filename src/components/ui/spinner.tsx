import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SpinnerProps {
  /** Additional classes for size or placement */
  className?: string;
  /** Icon size in pixels. Default 24. */
  size?: number;
}

export function Spinner({ className, size = 24 }: SpinnerProps) {
  return (
    <Loader2
      className={cn("text-primary animate-spin", className)}
      style={{ width: size, height: size }}
    />
  );
}
