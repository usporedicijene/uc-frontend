import { useTranslations } from "next-intl";

import type {
  IndexStatsCategory,
  IndexStatsView,
} from "@/features/index-stats/types";

interface IndexStatsHeadingProps {
  view: IndexStatsView;
  city: string;
  category: IndexStatsCategory | "all";
  resultsCount: number;
}

export function IndexStatsHeading({
  category,
  city,
  resultsCount,
  view,
}: IndexStatsHeadingProps) {
  const t = useTranslations("IndexStatsTable");

  let baseTitle = "";
  switch (view) {
    case "per_city":
      baseTitle = t("title");
      break;
    case "per_market":
      baseTitle = t("titleMarket", {
        defaultValue: "Statistike po trgovinama",
      });
      break;
    case "per_category":
      baseTitle = t("titleCategory", {
        defaultValue: "Statistike po kategorijama",
      });
      break;
  }

  // Build comprehensive filter description
  const filterParts = [];

  if (city !== "all") {
    filterParts.push(city);
  }

  if (category !== "all") {
    filterParts.push(category);
  }

  const filterDescription =
    filterParts.length > 0 ? filterParts.join(" • ") : "Hrvatska";

  return (
    <div className="space-y-1 text-left lg:space-y-1">
      <h1 className="text-xl font-bold lg:text-xl">{baseTitle}</h1>
      <p className="text-muted-foreground text-sm leading-snug lg:text-base">
        {filterDescription} • {resultsCount} {t("results")}
      </p>
    </div>
  );
}
