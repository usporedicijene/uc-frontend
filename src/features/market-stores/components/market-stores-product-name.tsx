import { capitalize } from "@/lib/utils";

interface MarketStoresProductNameProps {
  name?: string | null;
  brand?: string | null;
  barcode?: string;
}

export function MarketStoresProductName({
  barcode,
  brand,
  name,
}: MarketStoresProductNameProps) {
  if (!name && !brand && !barcode) return null;

  return (
    <div className="mb-4">
      {name && <div className="text-lg font-semibold">{name}</div>}
      {brand && (
        <div className="text-muted-foreground text-base font-medium">
          {capitalize(brand)}
        </div>
      )}
      {barcode && (
        <div className="text-muted-foreground text-base">{barcode}</div>
      )}
    </div>
  );
}
