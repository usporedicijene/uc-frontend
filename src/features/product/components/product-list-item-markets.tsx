import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getProductByBarcode } from "@/api/product";
import type { GetProductByBarcodeResponse } from "@/api/types/product";
import { MarketLogo } from "@/components/market-logo";
import { Badge } from "@/components/ui/badge";
import {
  ShowMoreProvider,
  ShowMoreRows,
  ShowMoreToggle,
} from "@/components/ui/show-more";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize } from "@/lib/utils";

import { BestPriceSummary } from "./best-price-summary";
import { ProductMarketTableRow } from "./product-market-table-row";

interface ProductListItemMarketsProps {
  barcode: string;
  cityId?: string;
  searchedValue?: string;
}

export async function ProductListItemMarkets({
  barcode,
  cityId,
  searchedValue,
}: ProductListItemMarketsProps) {
  const t = await getTranslations("ProductListItemMarkets");

  let productData: GetProductByBarcodeResponse | null;

  try {
    productData = await getProductByBarcode(barcode, cityId);
  } catch {
    return (
      <div className="p-4 text-center text-red-500">{t("fetchFailed")}</div>
    );
  }

  if (!productData || !productData.found) {
    return <div className="p-4 text-center">{t("noDetails")}</div>;
  }

  const availableMarkets = Object.values(productData.markets).filter(
    (market) => market.available,
  );

  const minPrice = Math.min(
    ...availableMarkets
      .filter((m) => m.min_price !== null)
      .map((m) => m.min_price as number),
  );

  const maxPrice = Math.max(
    ...availableMarkets
      .filter((m) => m.max_price !== null)
      .map((m) => m.max_price as number),
  );

  // Sort markets by price (lowest first)
  const sortedMarkets = [...availableMarkets].sort((a, b) => {
    const priceA = a.min_price ?? a.max_price ?? Infinity;
    const priceB = b.min_price ?? b.max_price ?? Infinity;

    if (priceA !== priceB) {
      return priceA - priceB;
    }

    const aIsRange = a.min_price !== a.max_price;
    const bIsRange = b.min_price !== b.max_price;

    if (aIsRange === bIsRange) {
      return 0;
    }

    return aIsRange ? 1 : -1;
  });

  // Identify markets that match the absolute lowest price
  const bestPriceMarkets = sortedMarkets.filter((market) => {
    const price = market.min_price ?? market.max_price;
    return price != null && price === minPrice;
  });

  const tableMarkets = sortedMarkets.filter(
    (m) => !bestPriceMarkets.some((bp) => bp.id === m.id),
  );
  const totalCount = tableMarkets.length;

  return (
    <div className="flex w-full flex-col gap-3 px-3 pb-1">
      {availableMarkets.length > 0 ? (
        <>
          {Number.isFinite(minPrice) && bestPriceMarkets.length > 0 && (
            <BestPriceSummary
              barcode={barcode}
              markets={bestPriceMarkets}
              maxPrice={maxPrice}
              minPrice={minPrice}
              searchedValue={searchedValue}
              showBestBadge={false}
            />
          )}

          {tableMarkets.length > 0 && (
            <div className="flex flex-col gap-1">
              <div>
                <Badge variant="outline">{t("otherStores")}</Badge>
              </div>
              <ShowMoreProvider initialVisibleCount={3} totalCount={totalCount}>
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-muted-foreground" />
                      <TableHead className="text-muted-foreground text-right">
                        {t("tablePrice")}
                      </TableHead>
                      <TableHead className="text-muted-foreground text-right">
                        {t("savings")}
                      </TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <ShowMoreRows>
                      {tableMarkets.map((market) => {
                        const marketPrice =
                          market.min_price ?? market.max_price;
                        const isPriceRange =
                          market.min_price != null &&
                          market.max_price != null &&
                          market.min_price !== market.max_price;
                        const isBest =
                          marketPrice != null && marketPrice === minPrice;
                        const isHighest =
                          market.min_price === maxPrice ||
                          market.max_price === maxPrice;
                        const savingsPercent =
                          marketPrice && Number.isFinite(maxPrice)
                            ? Math.max(
                                0,
                                ((maxPrice - marketPrice) / maxPrice) * 100,
                              )
                            : 0;
                        const marketSlug = (market.name || "").toLowerCase();
                        const href = searchedValue
                          ? `/market-stores/${marketSlug}/${barcode}?searchedValue=${encodeURIComponent(searchedValue)}`
                          : `/market-stores/${marketSlug}/${barcode}`;

                        return (
                          <ProductMarketTableRow href={href} key={market.id}>
                            <TableCell>
                              <div className="flex items-center gap-2 transition-transform group-hover:scale-[1.02]">
                                <MarketLogo
                                  className="flex-shrink-0"
                                  marketName={market.name}
                                  size="xs"
                                />
                                <span className="truncate font-medium">
                                  {capitalize(market.name)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right align-middle font-semibold">
                              <span
                                className={`inline-block transition-transform group-hover:scale-105 ${isBest ? "text-emerald-600" : isHighest ? "text-rose-600" : ""}`}
                              >
                                {isPriceRange ? (
                                  <>
                                    €{market.min_price!.toFixed(2)} – €
                                    {market.max_price!.toFixed(2)}
                                  </>
                                ) : (
                                  <>
                                    {marketPrice != null
                                      ? `€${marketPrice.toFixed(2)}`
                                      : "—"}
                                  </>
                                )}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-right align-middle text-xs">
                              {savingsPercent > 0 ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-block cursor-default transition-transform group-hover:scale-105">
                                      -{savingsPercent.toFixed(0)}%
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent sideOffset={4}>
                                    {t("savingsTooltip")}
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell className="pl-6 text-right align-middle">
                              <ChevronRight className="text-muted-foreground h-4 w-4 transition-all group-hover:translate-x-1 group-hover:scale-110 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                            </TableCell>
                          </ProductMarketTableRow>
                        );
                      })}
                    </ShowMoreRows>
                  </TableBody>
                </Table>
                <div className="flex justify-center">
                  <ShowMoreToggle className="group" />
                </div>
              </ShowMoreProvider>
            </div>
          )}
        </>
      ) : (
        <div className="text-muted-foreground py-6 text-center text-sm">
          {t("noMarkets")}
        </div>
      )}
    </div>
  );
}
