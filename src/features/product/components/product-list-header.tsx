import React from "react";
import { useTranslations } from "next-intl";

interface ProductResultsHeaderProps {
  totalUnique: number;
  displayedCount: number;
}

export function ProductResultsHeader({
  displayedCount,
  totalUnique,
}: ProductResultsHeaderProps) {
  const t = useTranslations("ProductListHeader");

  return (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-primary text-lg font-semibold">
        {t("resultsTitle", { count: totalUnique })}
      </h2>
      <p className="text-muted-foreground text-sm">
        {t("resultsSummary", {
          count: totalUnique,
          displayed: displayedCount,
        })}
      </p>
    </div>
  );
}
