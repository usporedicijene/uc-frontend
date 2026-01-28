import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { MarketPrice } from "@/api/types/product";
import { MarketLogo } from "@/components/market-logo";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize } from "@/lib/utils";

interface BestPriceSummaryProps {
  barcode: string;
  markets: MarketPrice[];
  maxPrice?: number;
  minPrice: number;
  searchedValue?: string;
  showBestBadge?: boolean;
}

export async function BestPriceSummary({
  barcode,
  markets,
  maxPrice,
  minPrice,
  searchedValue,
  showBestBadge = true,
}: BestPriceSummaryProps) {
  const t = await getTranslations("BestPriceSummary");

  const hasSavings =
    typeof maxPrice === "number" &&
    Number.isFinite(maxPrice) &&
    maxPrice > minPrice;
  const savingsPercent = hasSavings
    ? Math.max(0, ((maxPrice - minPrice) / maxPrice) * 100)
    : 0;

  return (
    <div className="dark:border-border overflow-hidden rounded-md border border-emerald-200 bg-emerald-50 p-3 dark:bg-emerald-950/20">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="order-2 grid min-w-0 grid-cols-2 gap-3 sm:order-1 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
          {markets.map((market) => {
            const marketSlug = (market.name || "").toLowerCase();
            const href = searchedValue
              ? `/market-stores/${marketSlug}/${barcode}?searchedValue=${encodeURIComponent(searchedValue)}`
              : `/market-stores/${marketSlug}/${barcode}`;
            return (
              <Link
                className="group sm:bg-background/70 sm:dark:bg-background/40 inline-flex w-full min-w-0 items-center gap-2 rounded-md border p-2 text-xs transition-all hover:scale-[1.02] hover:border-emerald-600/40 sm:w-auto sm:whitespace-nowrap dark:hover:border-emerald-400/40"
                href={href}
                key={market.id}
              >
                <MarketLogo
                  className="shrink-0"
                  marketName={market.name}
                  size="sm"
                />
                <span className="min-w-0 flex-1 truncate font-medium sm:max-w-28 sm:text-xs">
                  {capitalize(market.name)}
                </span>
                <ChevronRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
              </Link>
            );
          })}
        </div>

        <div className="order-1 flex items-center justify-between gap-2 sm:order-2 sm:justify-end sm:gap-6">
          {showBestBadge && (
            <div className="flex">
              <Badge className="bg-emerald-600 text-white">
                🏆 {t("bestPrice")}
              </Badge>
            </div>
          )}
          <div className="flex items-center gap-2 text-right text-lg font-semibold text-emerald-700 sm:text-xl dark:text-emerald-400">
            <span className="text-muted-foreground text-xs font-normal">
              {t("price")}
            </span>
            €{Number(minPrice).toFixed(2)}
          </div>

          {hasSavings && (
            <div className="flex items-center gap-2 text-xs sm:whitespace-nowrap">
              <span className="text-muted-foreground">{t("savings")}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default font-medium text-emerald-700 dark:text-emerald-400">
                    {savingsPercent.toFixed(0)}%
                  </span>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  {t("savingsTooltip")}
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
