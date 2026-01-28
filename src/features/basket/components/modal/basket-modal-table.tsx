"use client";

import { Fragment, useMemo } from "react";
import { useTranslations } from "next-intl";

import type { BasketStorePrice } from "@/api/types/basket";
import { MarketLogo } from "@/components/market-logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  formatStoreAddress,
  getStoreAvailableCount,
  getStoreTotalPrice,
} from "@/features/basket/utils";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface BasketModalTableProps {
  desktopView: "table" | "cards";
  stores: BasketStorePrice[];
}

export function BasketModalTable({
  desktopView,
  stores,
}: BasketModalTableProps) {
  const t = useTranslations("BasketModalTable");

  const storesWithProductMap = useMemo(() => {
    return stores.map((store) => ({
      ...store,
      productsMap: new Map(store.items.map((item) => [item.barcode, item])),
    }));
  }, [stores]);

  const tableRows = useMemo(() => {
    const productInfo = stores
      .flatMap((store) => store.items)
      .reduce((accumulator, item) => {
        const existing = accumulator.get(item.barcode);

        // Pick the best available name for the product.
        const candidateName =
          item.product_name || item.name || item.brand || item.barcode;

        let product;

        if (existing) {
          // If we already have a product entry but its name is just the barcode
          // (fallback) and we have now found a more descriptive name, update it.
          if (
            existing.name === item.barcode &&
            candidateName !== item.barcode
          ) {
            existing.name = candidateName;
          }
          product = existing;
        } else {
          product = { name: candidateName, count: 0 };
        }

        if (item.total_price != null) {
          product.count += 1;
        }

        accumulator.set(item.barcode, product);
        return accumulator;
      }, new Map<string, { name: string; count: number }>());

    const rows = Array.from(productInfo, ([barcode, { count, name }]) => ({
      barcode,
      name,
      count,
    }));

    rows.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    return rows;
  }, [stores]);

  return (
    <div
      className={cn(
        "mx-6 hidden max-h-[70vh] overflow-auto rounded-md border lg:block",
        desktopView === "table" ? "lg:block" : "lg:hidden",
      )}
    >
      <div
        className="grid min-w-max gap-px"
        style={{
          gridTemplateColumns: `280px repeat(${stores.length}, 220px)`,
        }}
      >
        <div className="bg-card sticky top-0 left-0 z-20 p-3 text-sm font-medium">
          {t("showProducts")}
        </div>
        {stores.map((store) => (
          <div
            className="bg-muted sticky top-0 z-10 p-3"
            key={`head-${store.store_id}`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex min-w-0 items-center gap-2">
                      <MarketLogo marketName={store.client} size="xs" />
                      <span className="truncate text-sm font-medium capitalize">
                        {store.client}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span className="capitalize">{store.client}</span>
                  </TooltipContent>
                </Tooltip>
                <span className="shrink-0 text-sm font-semibold">
                  {formatCurrency(getStoreTotalPrice(store))}
                </span>
              </div>
              {(store.address || store.city) && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground truncate text-xs">
                      {formatStoreAddress(store.address, store.city)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {formatStoreAddress(store.address, store.city)}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="text-muted-foreground mt-1 truncate text-xs">
              {t("available")}: {getStoreAvailableCount(store)}/
              {tableRows.length}
            </div>
          </div>
        ))}
        {tableRows.map((row) => (
          <Fragment key={row.barcode}>
            <div
              className="bg-muted sticky left-0 z-10 p-3 text-sm"
              key={row.barcode}
            >
              <span className="block truncate">{row.name}</span>
              <span className="text-muted-foreground block text-xs">
                {row.barcode}
              </span>
            </div>
            {storesWithProductMap.map((store) => {
              const item = store.productsMap.get(row.barcode) ?? null;
              return (
                <div
                  className="bg-card p-3 text-sm"
                  key={`cell-${row.barcode}-${store.store_id}`}
                >
                  {item?.total_price != null ? (
                    formatCurrency(item.total_price)
                  ) : (
                    <span className="text-muted-foreground">
                      {t("notAvailable")}
                    </span>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
