import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col p-4 md:px-6 md:py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
