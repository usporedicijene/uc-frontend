import { BadgeCheck, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MarketStoresPriceBadgeProps {
  price: number;
  isCheapest: boolean;
  isHighest: boolean;
}

export function MarketStoresPriceBadge({
  isCheapest,
  isHighest,
  price,
}: MarketStoresPriceBadgeProps) {
  const isFinitePrice = Number.isFinite(price);

  return (
    <Badge
      className={cn(
        "px-2 py-1 text-sm font-semibold",
        isCheapest && "bg-emerald-600 text-white",
        isHighest && "bg-rose-600 text-white",
        !isCheapest && !isHighest && "bg-muted text-foreground",
      )}
    >
      {isCheapest && <BadgeCheck className="mr-1 size-3" />}
      {isHighest && <TrendingUp className="mr-1 size-3" />}€
      {isFinitePrice ? price.toFixed(2) : "—"}
    </Badge>
  );
}
