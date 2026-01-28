"use client";

import { List, Map } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IndexStatsMobileViewToggleProps {
  currentView: "table" | "map";
  onViewChange: (view: "table" | "map") => void;
}

export function IndexStatsMobileViewToggle({
  currentView,
  onViewChange,
}: IndexStatsMobileViewToggleProps) {
  const t = useTranslations("IndexStatsPage");

  return (
    <Card className="mx-auto w-fit p-1 shadow-sm">
      <div className="flex">
        <Button
          className={`h-9 gap-2 px-4 text-sm font-medium ${
            currentView === "table"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"
          }`}
          size="sm"
          variant="ghost"
          onClick={() => onViewChange("table")}
        >
          <List className="h-4 w-4" />
          {t("tableView")}
        </Button>
        <Button
          className={`h-9 gap-2 px-4 text-sm font-medium ${
            currentView === "map"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"
          }`}
          size="sm"
          variant="ghost"
          onClick={() => onViewChange("map")}
        >
          <Map className="h-4 w-4" />
          {t("mapView")}
        </Button>
      </div>
    </Card>
  );
}
