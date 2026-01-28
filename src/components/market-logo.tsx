import Image from "next/image";

import { getMarketLogo } from "@/lib/market-logo-mapper";
import { capitalize, cn } from "@/lib/utils";

interface MarketLogoProps {
  marketName: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  className?: string;
}

// Numeric pixel sizes for each variant (larger than before)
const SIZE_MAP = {
  xxs: 20,
  xs: 28,
  sm: 32,
  md: 48,
  lg: 64,
} as const;

export function MarketLogo({
  className,
  marketName,
  size = "md",
}: MarketLogoProps) {
  const logoPath = getMarketLogo(marketName);
  const dimension = SIZE_MAP[size] ?? SIZE_MAP.md;

  if (!logoPath) {
    // Fallback: render first letter inside a circle
    return (
      <div
        className={cn(
          "bg-muted text-muted-foreground flex items-center justify-center rounded-full font-semibold",
          className,
        )}
        style={{ width: dimension, height: dimension }}
        title={marketName}
      >
        {capitalize(marketName)}
      </div>
    );
  }

  return (
    <Image
      alt={`${capitalize(marketName)} logo`}
      className={cn("rounded-sm object-contain", className)}
      height={dimension}
      src={logoPath}
      width={dimension}
    />
  );
}
