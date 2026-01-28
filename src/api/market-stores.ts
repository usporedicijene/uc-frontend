import { fetchApi } from "@/fetchApi";

import type { GetMarketStoresResponse } from "./types/market-stores";

export async function getMarketStores(
  market: string,
  barcode: string,
  city?: string,
): Promise<GetMarketStoresResponse> {
  const queryParams = new URLSearchParams();

  if (city) {
    queryParams.append("city", city);
  }

  const queryString = queryParams.toString();

  const path = queryString
    ? `/market-stores/${market}/${barcode}?${queryString}`
    : `/market-stores/${market}/${barcode}`;

  return await fetchApi(path);
}
