"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopToolbarProps {
  comparedStoresCount: number;
  desktopView: "table" | "cards";
  setDesktopView: (view: "table" | "cards") => void;
}

export function BasketModalDesktopToolbar({
  comparedStoresCount,
  desktopView,
  setDesktopView,
}: DesktopToolbarProps) {
  const t = useTranslations("BasketModalDesktopToolbar");

  return (
    <div className="hidden w-full items-center justify-between gap-6 px-6 py-5 lg:flex">
      <div className="text-muted-foreground mr-6 text-sm">
        {t("description", { top: comparedStoresCount })}
      </div>
      <div className="bg-card inline-flex items-center gap-1 rounded-md border p-0.5">
        <Button
          className={cn(
            desktopView === "table" && "bg-primary/10 text-primary",
          )}
          size="sm"
          variant="ghost"
          onClick={() => setDesktopView("table")}
        >
          {t("tableView")}
        </Button>
        <Button
          className={cn(
            desktopView === "cards" && "bg-primary/10 text-primary",
          )}
          size="sm"
          variant="ghost"
          onClick={() => setDesktopView("cards")}
        >
          {t("cardView")}
        </Button>
      </div>
    </div>
  );
}
