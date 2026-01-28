import type { GroupedResult } from "@/api/types/product";
import { ProductResultsHeader } from "@/features/product/components/product-list-header";

import { ProductListItem } from "./product-list-item";

interface ProductResultsProps {
  groupedProducts?: GroupedResult[];
  totalUnique: number;
  displayedCount: number;
  cityId?: string;
  searchedValue?: string;
}

export function ProductList({
  cityId,
  displayedCount,
  groupedProducts = [],
  searchedValue,
  totalUnique,
}: ProductResultsProps) {
  return (
    <div className="animate-in fade-in flex w-full max-w-5xl flex-col items-center justify-center gap-6 duration-300">
      <ProductResultsHeader
        displayedCount={displayedCount}
        totalUnique={totalUnique}
      />
      <div className="flex w-full flex-col gap-4">
        {groupedProducts.map((group) => (
          <ProductListItem
            cityId={cityId}
            groupedProduct={group}
            key={group.barcode}
            searchedValue={searchedValue}
          />
        ))}
      </div>
    </div>
  );
}
