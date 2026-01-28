import { Suspense } from "react";

import { getCities } from "@/api/city";
import { MarketLogo } from "@/components/market-logo";
import { MarketStoresBackButton } from "@/features/market-stores/components/market-stores-back-button";
import { getCityIdCookie } from "@/lib/cookies/city";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ market: string; barcode: string }>;
}

export async function MarketStoresLayoutContent({
  children,
  params,
}: LayoutProps) {
  const [{ market }, cityId, { cities }] = await Promise.all([
    params,
    getCityIdCookie(),
    getCities(),
  ]);

  const titleMarket = market.charAt(0).toUpperCase() + market.slice(1);
  const cityName = cities.find((c) => c.id === cityId)?.name;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <MarketStoresBackButton />
        <MarketLogo marketName={titleMarket} size="md" />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{titleMarket}</h1>
          {cityName && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              {cityName}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={null}>
      <MarketStoresLayoutContent params={params}>
        {children}
      </MarketStoresLayoutContent>
    </Suspense>
  );
}
