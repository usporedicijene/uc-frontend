"use client";

import { useTranslations } from "next-intl";

import type { BasketStorePriceItem } from "@/api/types/basket";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface StoreCardItemProps {
  id: string;
  item: BasketStorePriceItem;
}

export function BasketModalStoreCardItem({ id, item }: StoreCardItemProps) {
  const t = useTranslations("BasketModalStoreCardItem");
  const isAvailable = item.total_price != null;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded border p-2",
        isAvailable ? "" : "opacity-60",
      )}
      key={`${id}-${item.barcode}`}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">
          {item.product_name || item.name || item.brand || item.barcode}
        </div>
        <div className="text-muted-foreground truncate text-xs">
          {item.barcode}
        </div>
      </div>
      <div className="shrink-0 text-right text-sm">
        {isAvailable ? (
          <>
            <div>{formatCurrency(item.unit_price)}</div>
            {item.quantity > 1 && (
              <div className="text-muted-foreground text-xs">
                ×{item.quantity} = {formatCurrency(item.total_price)}
              </div>
            )}
          </>
        ) : (
          <div className="text-muted-foreground">{t("notAvailable")}</div>
        )}
      </div>
    </div>
  );
}
