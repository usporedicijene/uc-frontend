import { useTranslations } from "next-intl";

import type { StoreLocation } from "@/api/types/locations";
import { MarketLogo } from "@/components/market-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStoreAddress } from "@/features/basket/utils";
import { capitalize } from "@/lib/utils";

import { BasketRemoveStoreButton } from "./basket-selected-stores-remove-button";
import { BasketStoreCombobox } from "./basket-store-combobox";

interface SelectedStoresProps {
  selectedLocations: StoreLocation[];
  locations: StoreLocation[];
}

export function BasketSelectedStores({
  locations,
  selectedLocations,
}: SelectedStoresProps) {
  const t = useTranslations("BasketSelectedStores");

  return (
    <Card className="flex h-full min-h-0 flex-col gap-2 overflow-hidden py-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{t("selectedTitle")}</CardTitle>
          <BasketStoreCombobox
            locations={locations}
            selectedLocations={selectedLocations}
          />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto pr-2">
        {selectedLocations.length === 0 && (
          <div className="text-muted-foreground text-sm">{t("noSelected")}</div>
        )}
        <div className="flex flex-col gap-2">
          {selectedLocations.map((store) => (
            <div
              className="flex items-center justify-between gap-4 rounded border p-2"
              key={store.store_id}
            >
              <div className="flex min-w-0 items-center gap-3">
                <MarketLogo marketName={store.client} size="xs" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {capitalize(store.client)}
                  </div>
                  <div className="text-muted-foreground truncate text-xs">
                    {formatStoreAddress(store.city, store.address, " • ")}
                  </div>
                </div>
              </div>
              <BasketRemoveStoreButton
                locations={selectedLocations}
                storeId={store.store_id}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
