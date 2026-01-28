"use server";

import { searchProducts } from "@/api/product";
import type {
  BasketItemRequest,
  BasketPricesResponse,
} from "@/api/types/basket";
import type { StoreLocation } from "@/api/types/locations";
import type { Product, SearchProductsResponse } from "@/api/types/product";
import { fetchApi } from "@/fetchApi";
import {
  getBasketItemsCookie,
  getBasketLocationsCookie,
  setBasketItemsCookie,
  setBasketLocationsCookie,
} from "@/lib/cookies/basket";

export async function persistLocationsAction(
  locations: StoreLocation[],
): Promise<void> {
  await setBasketLocationsCookie(locations);
}

export async function persistItemsAction(
  items: BasketItemRequest[],
): Promise<void> {
  await setBasketItemsCookie(items);
}

export async function incrementItemQuantityAction(
  barcode: string,
): Promise<void> {
  const currentItems: BasketItemRequest[] = await getBasketItemsCookie();
  const nextItems: BasketItemRequest[] = currentItems.map((item) =>
    item.barcode === barcode ? { ...item, quantity: item.quantity + 1 } : item,
  );
  await setBasketItemsCookie(nextItems);
}

export async function decrementItemQuantityAction(
  barcode: string,
): Promise<boolean> {
  const currentItems: BasketItemRequest[] = await getBasketItemsCookie();

  let deleted = false;

  const nextItems: BasketItemRequest[] = currentItems.flatMap((item) => {
    if (item.barcode !== barcode) return [item];

    const nextQuantity = item.quantity - 1;
    if (nextQuantity <= 0) {
      deleted = true;
      return [];
    }

    return [{ ...item, quantity: nextQuantity }];
  });

  await setBasketItemsCookie(nextItems);
  return deleted;
}

export async function searchProductsAction(
  value: string,
): Promise<{ barcode: string; name: string; brand: string }[]> {
  const data: SearchProductsResponse = await searchProducts(value);

  const mapped = (data?.results || []).map((p: Product) => ({
    barcode: p.barcode,
    name: p.name,
    brand: p.brand,
  }));

  const unique: { barcode: string; name: string; brand: string }[] = [];
  const seen = new Set<string>();
  for (const item of mapped) {
    if (item.barcode && !seen.has(item.barcode)) {
      seen.add(item.barcode);
      unique.push(item);
    }
  }

  return unique.slice(0, 20);
}

export async function compareBasketAction(): Promise<BasketPricesResponse> {
  const [basket, selectedLocations] = await Promise.all([
    getBasketItemsCookie(),
    getBasketLocationsCookie(),
  ]);

  const apiResponse: BasketPricesResponse = await fetchApi("/basket-prices", {
    method: "POST",
    body: { stores: selectedLocations, basket },
  });

  // Enrich stores with address/city from selectedLocations and item name/brand from basket cookie
  apiResponse.stores = apiResponse.stores.map((store) => {
    const selectedLocation = selectedLocations.find(
      (loc) =>
        loc.client === store.client &&
        String(loc.store_id) === String(store.store_id),
    );

    return {
      ...store,
      address: selectedLocation?.address ?? store.address ?? "",
      city: selectedLocation?.city ?? store.city ?? "",
      items: store.items.map((item) => {
        const fromCookie = basket.find((b) => b.barcode === item.barcode);
        return {
          ...item,
          name: item.name ?? fromCookie?.name ?? null,
          brand: item.brand ?? fromCookie?.brand ?? null,
        };
      }),
    };
  });

  return apiResponse;
}
