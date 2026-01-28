"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import type { BasketStorePrice } from "@/api/types/basket";
import { MarketLogo } from "@/components/market-logo";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BasketModalStoreCardItem } from "@/features/basket/components/modal/basket-modal-store-card-item";
import {
  formatStoreAddress,
  getStoreAvailableCount,
  getStoreTotalPrice,
} from "@/features/basket/utils";
import { formatCurrency } from "@/lib/currency";

interface StoreCardProps {
  store: BasketStorePrice;
  totalItems: number;
}

export function BasketModalStoreCard({ store, totalItems }: StoreCardProps) {
  const t = useTranslations("BasketModalStoreCard");

  const [isOpen, setIsOpen] = useState(false);
  const id = `${store.client}-${store.store_id}`;
  const totalPrice = getStoreTotalPrice(store);
  const availableCount = getStoreAvailableCount(store);

  return (
    <Card className="border-muted/60 bg-card gap-3 p-0" key={id}>
      <div className="flex items-center justify-between gap-4 px-4 pt-3">
        <div className="flex min-w-0 items-center gap-3">
          <MarketLogo marketName={store.client} size="xs" />
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="truncate text-sm font-medium capitalize">
                {store.client}
              </span>
            </div>
            {(store.address || store.city) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-muted-foreground truncate text-xs">
                    {formatStoreAddress(store.address, store.city)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {formatStoreAddress(store.address, store.city)}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-base font-semibold">
            {formatCurrency(totalPrice)}
          </div>
          <div className="text-muted-foreground text-xs">
            {t("available")}: {availableCount}/{totalItems}
          </div>
        </div>
      </div>
      <Collapsible open={isOpen}>
        <CollapsibleContent className="px-4 pt-1 pb-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {store.items.map((item) => (
              <BasketModalStoreCardItem
                id={id}
                item={item}
                key={`${id}-${item.barcode}`}
              />
            ))}
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger
          className="w-full border-t px-3 py-2.5 text-center text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? t("hideProducts") : t("showProducts")}
        </CollapsibleTrigger>
      </Collapsible>
    </Card>
  );
}
