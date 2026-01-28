import { useTranslations } from "next-intl";

import type { BasketItemRequest } from "@/api/types/basket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BasketBarcodeScannerDialog } from "./basket-barcode-dialog";
import { BasketProductCombobox } from "./basket-product-combobox";
import { BasketSelectedItemQuantity } from "./basket-selected-items-quantity";

interface SelectedItemsProps {
  items: BasketItemRequest[];
}

export function BasketSelectedItems({ items }: SelectedItemsProps) {
  const t = useTranslations("BasketSelectedItems");

  return (
    <Card className="flex h-full min-h-0 flex-col gap-2 overflow-hidden py-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{t("title")}</CardTitle>
          <div className="flex items-center gap-2">
            <BasketBarcodeScannerDialog items={items} />
            <BasketProductCombobox items={items} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto pr-2">
        {items.length === 0 && (
          <div className="text-muted-foreground text-sm">{t("empty")}</div>
        )}
        {items.map((item) => {
          const name = String(item.name || "").trim();
          const title = name || item.barcode;
          const subtitle = `${item.barcode}`;
          return (
            <div
              className="flex items-center justify-between gap-2 rounded border p-2"
              key={item.barcode}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{title}</div>
                <div className="text-muted-foreground truncate text-xs">
                  {subtitle}
                </div>
              </div>
              <BasketSelectedItemQuantity
                barcode={item.barcode}
                initialQuantity={item.quantity}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
