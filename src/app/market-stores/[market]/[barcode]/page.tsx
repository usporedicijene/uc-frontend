import { getMarketStores } from "@/api/market-stores";
import { getProductMetaByBarcode } from "@/api/product";
import { BreadcrumbSchema } from "@/components/structured-data/breadcrumb-schema";
import { MarketStoresEmptyState } from "@/features/market-stores/components/market-stores-empty-state";
import { MarketStoresList } from "@/features/market-stores/components/market-stores-list";
import { MarketStoresProductName } from "@/features/market-stores/components/market-stores-product-name";
import { getCityIdCookie } from "@/lib/cookies/city";

import { getBreadcrumbItems, MarketStoresPageMetadata } from "./metadata";

export const metadata = MarketStoresPageMetadata;

interface PageProps {
  params: Promise<{ market: string; barcode: string }>;
}

export default async function MarketStoresPage({ params }: PageProps) {
  const [cityId, { barcode, market }] = await Promise.all([
    getCityIdCookie(),
    params,
  ]);

  const [data, { brand, name }] = await Promise.all([
    getMarketStores(market, barcode, cityId),
    getProductMetaByBarcode(barcode, cityId),
  ]);

  return (
    <>
      <MarketStoresProductName barcode={barcode} brand={brand} name={name} />
      {!data?.found && <MarketStoresEmptyState />}
      {data?.found && <MarketStoresList stores={data.stores} />}
      <BreadcrumbSchema
        items={getBreadcrumbItems(brand, name || "Proizvod", market, barcode)}
      />
    </>
  );
}
