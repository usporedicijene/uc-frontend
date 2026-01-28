import type { BasketStorePrice } from "@/api/types/basket";

export function getStoreTotalPrice(store: BasketStorePrice): number {
  return (
    store.total_basket_price ??
    store.total ??
    store.items.reduce((acc, item) => acc + (item.total_price ?? 0), 0)
  );
}

export function getStoreAvailableCount(store: BasketStorePrice): number {
  return (
    store.available_items ??
    store.items.filter((i) => i.available !== false && i.total_price != null)
      .length
  );
}

export function formatStoreAddress(
  address: string | null | undefined,
  city: string | null | undefined,
  separator: string = ", ",
): string {
  return [address, city].filter(Boolean).join(separator);
}
