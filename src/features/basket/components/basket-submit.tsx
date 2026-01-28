"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { BasketPricesResponse } from "@/api/types/basket";
import { Button } from "@/components/ui/button";

import { compareBasketAction } from "../actions";
import { BasketModal } from "./modal/basket-modal";

interface BasketSummaryProps {
  itemsCount: number;
  storesCount: number;
}

export function BasketSubmit({ itemsCount, storesCount }: BasketSummaryProps) {
  const t = useTranslations("BasketSubmit");

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<BasketPricesResponse | null>(null);

  function handleSubmit(): void {
    startTransition(async () => {
      const res = await compareBasketAction();
      setResponse(res);
      setOpen(true);
    });
  }

  const { basket_summary = {}, stores = [] } = response ?? {};

  return (
    <>
      <Button
        className="w-full"
        disabled={storesCount === 0 || itemsCount === 0 || isPending}
        size="lg"
        type="button"
        onClick={handleSubmit}
      >
        {t("comparePrices")}
        <span className="ml-2 opacity-80">
          ({t("summaryCounts", { stores: storesCount, items: itemsCount })})
        </span>
      </Button>
      {response && (
        <BasketModal
          basketSummary={basket_summary}
          open={open}
          stores={stores}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}
