"use client";

import { ScanBarcodeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { BasketItemRequest } from "@/api/types/basket";
import { BarcodeScannerDialog } from "@/components/barcode-scanner-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { persistItemsAction } from "../actions";
import { searchProductsAction } from "../actions";

interface BasketBarcodeScannerDialogProps {
  items: BasketItemRequest[];
}

export function BasketBarcodeScannerDialog({
  items,
}: BasketBarcodeScannerDialogProps) {
  const t = useTranslations("BasketBarcodeScannerDialog");

  async function handleScan(scanned: string) {
    // Try to fetch product details for the scanned barcode
    const searchResults = await searchProductsAction(scanned);

    const productInfo = searchResults[0];
    const name = productInfo?.name;
    const brand = productInfo?.brand;

    const exists = items.some((item) => item.barcode === scanned);
    const next: BasketItemRequest[] = exists
      ? items.map((item) =>
          item.barcode === scanned
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [
          ...items,
          {
            barcode: scanned,
            quantity: 1,
            ...(name ? { name } : {}),
            ...(brand ? { brand } : {}),
          },
        ];

    try {
      await persistItemsAction(next);
      toast(t("added"));
    } finally {
      document.getElementById("close-scanner-dialog")?.click();
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" type="button" variant="ghost">
              <ScanBarcodeIcon className="text-foreground/80 size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent sideOffset={4}>{t("scanBarcode")}</TooltipContent>
      </Tooltip>
      <BarcodeScannerDialog onScan={handleScan} />
    </Dialog>
  );
}
