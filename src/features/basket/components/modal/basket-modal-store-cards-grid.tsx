"use client";

import type { BasketStorePrice } from "@/api/types/basket";
import { BasketModalStoreCard } from "@/features/basket/components/modal/basket-modal-store-card";
import { cn } from "@/lib/utils";

interface StoreCardsGridProps {
  stores: BasketStorePrice[];
  totalItems: number;
  desktopView: "table" | "cards";
}

export function BasketModalStoreCardsGrid({
  desktopView,
  stores,
  totalItems,
}: StoreCardsGridProps) {
  return (
    <div
      className={cn(
        "overflow-y-auto pt-2 lg:max-h-[70vh]",
        desktopView === "table" ? "lg:hidden" : "",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-4 px-6 lg:grid-cols-2 lg:gap-6",
        )}
      >
        {stores.map((store) => (
          <BasketModalStoreCard
            key={`${store.client}-${store.store_id}`}
            store={store}
            totalItems={totalItems}
          />
        ))}
      </div>
    </div>
  );
}
