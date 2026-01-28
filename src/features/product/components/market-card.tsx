import Link from "next/link";
import { useTranslations } from "next-intl";

import type { MarketPrice } from "@/api/types/product";
import { MarketLogo } from "@/components/market-logo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MarketCardProps {
  isBestPrice: boolean;
  market: MarketPrice;
  maxPrice: number;
  originalIndex: number;
  barcode: string;
  searchedValue?: string;
}

// Named export according to user's preference
export function MarketCard({
  barcode,
  isBestPrice,
  market,
  maxPrice,
  originalIndex,
  searchedValue,
}: MarketCardProps) {
  const t = useTranslations("MarketCard");

  const marketPrice = market.min_price ?? market.max_price;
  const isHighest =
    market.min_price === maxPrice || market.max_price === maxPrice;

  const isPriceRange =
    market.min_price != null &&
    market.max_price != null &&
    market.min_price !== market.max_price;

  const savings =
    marketPrice && Number.isFinite(maxPrice)
      ? ((maxPrice - marketPrice) / maxPrice) * 100
      : 0;

  const marketSlug = (market.name || "").toLowerCase();
  const href = searchedValue
    ? `/market-stores/${marketSlug}/${barcode}?searchedValue=${encodeURIComponent(searchedValue)}`
    : `/market-stores/${marketSlug}/${barcode}`;

  return (
    <Link className="block" href={href}>
      <Card
        className={cn(
          "group relative m-1 gap-2 pt-4 pb-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:m-2",
          originalIndex === 0 && "shadow-md",
        )}
      >
        {/* Ranking Badge */}
        <div className="absolute -top-2 -left-2 z-10">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
              originalIndex === 0 && "bg-emerald-500 text-white",
              originalIndex === 1 && "bg-amber-500 text-white",
              originalIndex === 2 && "bg-orange-500 text-white",
              originalIndex > 2 && "bg-muted-foreground text-muted",
            )}
          >
            {originalIndex + 1}
          </div>
        </div>

        <CardContent className="space-y-2 p-3">
          {/* Market Logo & Name - Top Row */}
          <div className="flex items-center gap-2">
            <MarketLogo
              className="flex-shrink-0 shadow-sm"
              marketName={market.name}
              size="sm"
            />
            <div className="truncate text-sm font-medium">
              {capitalize(market.name)}
            </div>
          </div>

          {/* Price & Badges - Bottom Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Price - Left */}
            <div className="text-lg font-bold">
              {isPriceRange ? (
                <>
                  <span className={cn(isBestPrice && "text-emerald-600")}>
                    €{market.min_price!.toFixed(2)}
                  </span>
                  {" – "}
                  <span
                    className={cn(
                      market.max_price === maxPrice && "text-rose-600",
                    )}
                  >
                    €{market.max_price!.toFixed(2)}
                  </span>
                </>
              ) : (
                <span
                  className={cn(
                    isBestPrice && "text-emerald-600",
                    isHighest && !isBestPrice && "text-rose-600",
                  )}
                >
                  {marketPrice != null ? `€${marketPrice.toFixed(2)}` : "—"}
                </span>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              {savings > 5 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-emerald-100 text-xs text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                      -{savings.toFixed(0)}% {t("savings")}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>{t("savingsTooltip")}</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
