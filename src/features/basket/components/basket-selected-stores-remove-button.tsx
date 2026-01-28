"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";

import type { StoreLocation } from "@/api/types/locations";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

import { persistLocationsAction } from "../actions";

interface RemoveStoreButtonProps {
  storeId: string;
  locations: StoreLocation[];
}

export function BasketRemoveStoreButton({
  locations,
  storeId,
}: RemoveStoreButtonProps) {
  const t = useTranslations("BasketSelectedStoresRemoveButton");
  const [isPending, startTransition] = useTransition();

  async function handleRemove() {
    startTransition(async () => {
      const filtered = locations.filter(
        (location) => location.store_id !== storeId,
      );
      await persistLocationsAction(filtered);
      toast(t("removed"));
    });
  }

  return (
    <Button
      disabled={isPending}
      size="sm"
      variant="ghost"
      onClick={handleRemove}
    >
      {t("remove")}
    </Button>
  );
}
