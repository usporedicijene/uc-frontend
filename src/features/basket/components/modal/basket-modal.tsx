"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { BasketStorePrice, BasketSummary } from "@/api/types/basket";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { BasketModalCheapestStoreBanner } from "./basket-modal-cheapest-store-banner";
import { BasketModalDesktopToolbar } from "./basket-modal-desktop-toolbar";
import { BasketModalStoreCardsGrid } from "./basket-modal-store-cards-grid";
import { BasketModalTable } from "./basket-modal-table";

interface BasketCompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stores: BasketStorePrice[];
  basketSummary: BasketSummary;
}

export function BasketModal({
  basketSummary,
  onOpenChange,
  open,
  stores,
}: BasketCompareModalProps) {
  const t = useTranslations("BasketModal");

  const [desktopView, setDesktopView] = useState<"table" | "cards">("table");

  const sortedStores = useMemo(() => {
    if (!stores || stores.length === 0) return [];

    return [...stores].sort((a, b) => {
      const aAvailable = a.available_items ?? 0;
      const bAvailable = b.available_items ?? 0;

      if (aAvailable !== bAvailable) {
        return bAvailable - aAvailable;
      }

      const aPrice = a.total_basket_price ?? a.total ?? Infinity;
      const bPrice = b.total_basket_price ?? b.total ?? Infinity;

      if (aPrice !== bPrice) {
        return aPrice - bPrice;
      }

      return String(a.store_id).localeCompare(String(b.store_id));
    });
  }, [stores]);

  const cheapestStore = useMemo(() => {
    if (!sortedStores || sortedStores.length === 0) return undefined;

    const maxAvailableItems = Math.max(
      ...sortedStores.map((store) => store.available_items ?? 0),
    );

    if (maxAvailableItems === 0) {
      return undefined;
    }

    return sortedStores[0];
  }, [sortedStores]);

  const totalItems = useMemo(
    () => basketSummary?.total_items ?? 0,
    [basketSummary],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col overflow-hidden p-0 sm:max-w-[calc(100%-4rem)] xl:max-w-[1400px]">
        <div
          className={cn(
            "flex min-h-0 flex-col",
            desktopView === "cards" && "flex-1",
          )}
        >
          <div className="px-6 pt-6">
            <DialogHeader>
              <DialogTitle className="m-0">{t("title")}</DialogTitle>
            </DialogHeader>
          </div>

          {cheapestStore && (
            <BasketModalCheapestStoreBanner cheapestStore={cheapestStore} />
          )}

          <div className="flex h-full min-h-0 flex-col pb-6">
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              <div
                className={cn(
                  "hidden items-center justify-between lg:flex",
                  desktopView === "cards" &&
                    "bg-background sticky -top-[1px] z-10",
                )}
              >
                <BasketModalDesktopToolbar
                  comparedStoresCount={sortedStores.length}
                  desktopView={desktopView}
                  setDesktopView={setDesktopView}
                />
              </div>
              <BasketModalTable
                desktopView={desktopView}
                stores={sortedStores}
              />
              <BasketModalStoreCardsGrid
                desktopView={desktopView}
                stores={sortedStores}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
