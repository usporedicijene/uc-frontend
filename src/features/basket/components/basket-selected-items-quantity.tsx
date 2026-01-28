"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

import {
  decrementItemQuantityAction,
  incrementItemQuantityAction,
} from "../actions";

interface SelectedItemQuantityProps {
  barcode: string;
  initialQuantity: number;
}

export function BasketSelectedItemQuantity({
  barcode,
  initialQuantity,
}: SelectedItemQuantityProps) {
  const t = useTranslations("BasketSelectedItemsQuantity");
  const [quantity, setQuantity] = useState(initialQuantity);

  async function handleIncrement(): Promise<void> {
    setQuantity((q) => q + 1);
    incrementItemQuantityAction(barcode);
  }

  async function handleDecrement(): Promise<void> {
    if (quantity === 0) return;

    setQuantity((q) => Math.max(0, q - 1));

    const deleted = await decrementItemQuantityAction(barcode);
    if (deleted) {
      toast(t("removed"));
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost" onClick={handleDecrement}>
        -
      </Button>
      <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
      <Button size="sm" variant="ghost" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}
