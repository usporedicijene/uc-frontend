import { Database, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CountUp } from "@/components/count-up";
import type {
  IndexStatsCategory,
  IndexStatsView,
} from "@/features/index-stats/types";

interface IndexStatsSummaryProps {
  category: IndexStatsCategory | "all";
  city: string;
  croatiaIndex: {
    average_change: number;
    count: number;
  };
  dataArray: { name: string; average_change: number; count: number }[];
  view: IndexStatsView;
}

export async function IndexStatsSummary({
  category,
  city,
  croatiaIndex,
  dataArray,
  view,
}: IndexStatsSummaryProps) {
  const t = await getTranslations("IndexStatsSummary");

  // Calculate summary values
  const isDefaultView =
    view === "per_city" && city === "all" && category === "all";

  let summaryAverage: number;
  let summarySamples: number;

  if (isDefaultView) {
    // Use Croatia-wide index from backend
    summaryAverage = croatiaIndex.average_change;
    summarySamples = croatiaIndex.count;
  } else {
    // Calculate weighted average and total samples from displayed data
    summarySamples = dataArray.reduce((sum, row) => sum + row.count, 0);
    const weightedSum = dataArray.reduce(
      (sum, row) => sum + row.average_change * row.count,
      0,
    );
    summaryAverage = summarySamples ? weightedSum / summarySamples : 0;
  }

  // Note: Title logic removed as IndexStatsSummary no longer displays title
  // The title is now handled by IndexStatsHeading component

  return (
    <div className="flex flex-col items-stretch gap-2 px-0 lg:flex-row lg:items-center lg:gap-2">
      <div className="bg-muted/40 flex h-[60px] w-full items-start gap-2 rounded-md px-3 py-2 lg:h-[68px] lg:w-auto lg:gap-2 lg:px-4 lg:py-3">
        <div className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-md lg:size-8">
          <TrendingUp className="size-4 lg:size-4" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-muted-foreground text-sm leading-tight">
            {t("summaryAvgChange")}
          </span>
          <CountUp
            className="text-lg leading-none font-bold tabular-nums"
            decimals={2}
            end={summaryAverage}
            suffix="%"
          />
        </div>
      </div>
      <div className="bg-muted/40 flex h-[60px] w-full items-start gap-2 rounded-md px-3 py-2 lg:h-[68px] lg:w-auto lg:gap-2 lg:px-4 lg:py-3">
        <div className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-md lg:size-8">
          <Database className="size-4 lg:size-4" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-muted-foreground text-sm leading-tight">
            {t("summaryTotalSamples")}
          </span>
          <CountUp
            className="text-lg leading-none font-bold tabular-nums"
            end={summarySamples}
            separator="."
          />
        </div>
      </div>
    </div>
  );
}
