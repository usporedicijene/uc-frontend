"use client";

import { Children, createContext, useContext, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface ShowMoreContextValue {
  expanded: boolean;
  hiddenCount: number;
  initialVisibleCount: number;
  toggle: () => void;
}

const ShowMoreContext = createContext<ShowMoreContextValue | null>(null);

export function useShowMore() {
  return useContext(ShowMoreContext);
}

interface ShowMoreProviderProps {
  children: React.ReactNode;
  initialVisibleCount?: number;
  totalCount: number;
}

export function ShowMoreProvider({
  children,
  initialVisibleCount = 3,
  totalCount,
}: ShowMoreProviderProps) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, totalCount - initialVisibleCount);

  const value = useMemo<ShowMoreContextValue>(
    () => ({
      expanded,
      hiddenCount,
      initialVisibleCount,
      toggle: () => setExpanded((prev) => !prev),
    }),
    [expanded, hiddenCount, initialVisibleCount],
  );

  return (
    <ShowMoreContext.Provider value={value}>
      {children}
    </ShowMoreContext.Provider>
  );
}

export function ShowMoreRows({ children }: { children: React.ReactNode }) {
  const ctx = useContext(ShowMoreContext);

  if (!ctx) return children;

  const allChildren = Children.toArray(children);
  const displayed = ctx.expanded
    ? allChildren
    : allChildren.slice(0, ctx.initialVisibleCount);

  return displayed;
}

export function ShowMoreToggle({ className }: { className?: string }) {
  const t = useTranslations("ShowMoreToggle");
  const ctx = useContext(ShowMoreContext);

  if (!ctx || ctx.hiddenCount <= 0) return null;

  return (
    <Button
      aria-label={
        ctx.expanded
          ? t("showLess")
          : t("showMoreCount", { count: ctx.hiddenCount })
      }
      className={className}
      size="sm"
      variant="ghost"
      onClick={ctx.toggle}
    >
      {ctx.expanded
        ? t("showLess")
        : t("showMoreCount", { count: ctx.hiddenCount })}
    </Button>
  );
}
