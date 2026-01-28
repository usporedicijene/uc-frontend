"use client";

import React, { useRef, useState } from "react";
import { BarcodeStringFormat } from "react-qr-barcode-scanner";
import { RotateCcw } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";

const BarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
});

interface BarcodeScannerDialogProps {
  onScan: (scanned: string) => Promise<void> | void;
}

const BARCODE_FORMATS: BarcodeStringFormat[] = [
  BarcodeStringFormat.EAN_13,
  BarcodeStringFormat.EAN_8,
];

const SCANNER_DIMENSIONS = {
  desktop: { width: 460, height: 345 },
  mobile: { width: 320, height: 240 },
};

export function BarcodeScannerDialog({ onScan }: BarcodeScannerDialogProps) {
  const t = useTranslations("BarcodeScannerDialog");
  const tCommon = useTranslations("Common");

  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const hasScannedRef = useRef(false);
  const [isScannerLoading, setIsScannerLoading] = useState(true);
  const [stopStream, setStopStream] = useState(false);
  const isMobile = useIsMobile();

  const { height: scannerHeight, width: scannerWidth } = isMobile
    ? SCANNER_DIMENSIONS.mobile
    : SCANNER_DIMENSIONS.desktop;

  function handleOpenAutoFocus(e: Event) {
    e.preventDefault();
    hasScannedRef.current = false;
    setIsScannerLoading(true);
    setStopStream(false);
  }

  async function handleScannedValue(scanned: string) {
    if (!scanned || hasScannedRef.current) return;
    hasScannedRef.current = true;

    setStopStream(true);
    await onScan(scanned);
  }

  function onDialogClose() {
    setStopStream(true);
  }

  return (
    <DialogContent
      className="flex flex-col"
      showCloseButton={false}
      onCloseAutoFocus={onDialogClose}
      onOpenAutoFocus={handleOpenAutoFocus}
    >
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle>{t("title")}</DialogTitle>
        <Button
          aria-label={t("switchCamera")}
          size="icon"
          title={t("switchCamera")}
          variant="secondary"
          onClick={() =>
            setFacingMode((m) => (m === "environment" ? "user" : "environment"))
          }
        >
          <RotateCcw className="size-4" />
        </Button>
      </DialogHeader>
      <div className="viewport relative flex w-full items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{ width: scannerWidth, height: scannerHeight }}
        >
          <BarcodeScanner
            facingMode={facingMode}
            formats={BARCODE_FORMATS}
            height={scannerHeight}
            stopStream={stopStream}
            width={scannerWidth}
            onUpdate={(err, result) => {
              if (isScannerLoading) setIsScannerLoading(false);
              if (err) return;

              const text = result?.getText?.();
              if (text) handleScannedValue(text);
            }}
          />
          {isScannerLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Spinner size={24} />
              <span className="text-foreground/80 text-xs">
                {t("loadingScanner")}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="text-muted-foreground text-center text-xs">
        {t("moveCloser")}
      </div>
      <DialogFooter className="gap-2">
        <DialogClose asChild id="close-scanner-dialog">
          <Button variant="secondary">{tCommon("close")}</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
