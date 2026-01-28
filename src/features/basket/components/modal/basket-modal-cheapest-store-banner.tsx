"use client";

import { useTranslations } from "next-intl";

import type { BasketStorePrice } from "@/api/types/basket";
import { MarketLogo } from "@/components/market-logo";
import {
  formatStoreAddress,
  getStoreTotalPrice,
} from "@/features/basket/utils";
import { formatCurrency } from "@/lib/currency";
import { capitalize } from "@/lib/utils";

interface CheapestStoreBannerProps {
  cheapestStore: BasketStorePrice;
}

export function BasketModalCheapestStoreBanner({
  cheapestStore,
}: CheapestStoreBannerProps) {
  const t = useTranslations("BasketModalCheapestStoreBanner");

  const hasAllItems = cheapestStore.missing_items === 0;
  const missingCount = cheapestStore.missing_items ?? 0;

  return (
    <div className="mx-4 mt-4 mb-2 rounded-md bg-emerald-600 px-4 py-3 text-white sm:mx-6 lg:mx-auto lg:w-1/2">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        {/* Store logo and details */}
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex min-w-0 items-center gap-3">
            <MarketLogo marketName={cheapestStore.client} size="xs" />
            <div className="min-w-0">
              <div className="truncate font-medium">
                {t("cheapestStore")}: {capitalize(cheapestStore.client)}
              </div>
            </div>
          </div>
          {(cheapestStore.address || cheapestStore.city) && (
            <div className="text-sm opacity-90">
              {formatStoreAddress(cheapestStore.address, cheapestStore.city)}
            </div>
          )}
          <div className="text-xs opacity-80">
            {hasAllItems
              ? t("hasAllItems")
              : t("missingItems", { count: missingCount })}
          </div>
        </div>

        {/* Total price */}
        <div className="text-xl font-semibold md:shrink-0 md:text-end">
          {formatCurrency(getStoreTotalPrice(cheapestStore))}
        </div>
      </div>
    </div>
  );
}
