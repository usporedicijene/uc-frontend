"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

import { persistLocationsAction } from "../actions";

export function BasketClearStoresButton() {
  const t = useTranslations("BasketSelectedStoresClearButton");

  async function handleClear() {
    await persistLocationsAction([]);
    toast(t("removedAll"));
  }

  return (
    <Button variant="secondary" onClick={handleClear}>
      {t("clearAll")}
    </Button>
  );
}
