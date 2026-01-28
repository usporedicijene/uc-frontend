"use client";

import { ScanBarcodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { BarcodeScannerDialog } from "@/components/barcode-scanner-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProductBarcodeScannerDialog() {
  const t = useTranslations("ProductBarcodeScannerDialog");

  const router = useRouter();

  function handleScan(scanned: string) {
    setTimeout(() => {
      router.push(`/?value=${encodeURIComponent(scanned)}`);
      document.getElementById("close-scanner-dialog")?.click();
    }, 0);
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" type="button" variant="ghost">
              <ScanBarcodeIcon className="text-foreground/80 size-6" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent sideOffset={4}>{t("scanBarcode")}</TooltipContent>
      </Tooltip>
      <BarcodeScannerDialog onScan={handleScan} />
    </Dialog>
  );
}
