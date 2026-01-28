import { Suspense } from "react";

import type { GroupedResult } from "@/api/types/product";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalize } from "@/lib/utils";

import { ProductListItemMarkets } from "./product-list-item-markets";
import { ProductListItemMarketsSkeleton } from "./product-list-item-markets-skeleton";

interface ProductListItemProps {
  groupedProduct: GroupedResult;
  cityId?: string;
  searchedValue?: string;
}

export async function ProductListItem({
  cityId,
  groupedProduct,
  searchedValue,
}: ProductListItemProps) {
  const { barcode, products } = groupedProduct;
  const { brand, name } = products[0];

  return (
    <Card className="flex w-full gap-0 py-2">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-lg leading-none font-bold">{name}</CardTitle>
        <div className="flex flex-col gap-[2px]">
          <CardDescription className="text-base leading-tight font-medium">
            {brand ? capitalize(brand) : ""}
          </CardDescription>
          <CardDescription>{barcode}</CardDescription>
        </div>
      </CardHeader>
      <Suspense fallback={<ProductListItemMarketsSkeleton />}>
        <ProductListItemMarkets
          barcode={barcode}
          cityId={cityId}
          searchedValue={searchedValue}
        />
      </Suspense>
    </Card>
  );
}
