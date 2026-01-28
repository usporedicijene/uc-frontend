"use client";

import { useShowMore } from "@/components/ui/show-more";

export function NewsListBlurOverlay() {
  const ctx = useShowMore();

  if (!ctx || ctx.expanded || ctx.hiddenCount <= 0) {
    return null;
  }

  return (
    <div className="from-background via-background/90 pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
  );
}
