import { fetchApi } from "@/fetchApi";

import {
  GetProductByBarcodeResponse,
  ProductMeta,
  SearchProductsResponse,
} from "./types/product";

export async function searchProducts(
  value: string,
  cityId?: string,
): Promise<SearchProductsResponse> {
  if (!value)
    return {
      results: [],
      search_value: "",
      search_type: "",
      total: 0,
      total_unique: 0,
      limited: false,
      error: null,
    };

  const queryParams = new URLSearchParams();

  if (value) {
    queryParams.append("value", value);
  }

  if (cityId) {
    queryParams.append("city", cityId);
  }

  const queryString = queryParams.toString();
  const path = queryString ? `/search?${queryString}` : "/search";

  return await fetchApi(path);
}

export async function getProductByBarcode(
  barcode: string,
  city?: string,
): Promise<GetProductByBarcodeResponse> {
  const queryParams = new URLSearchParams();

  if (city) {
    queryParams.append("city", city);
  }

  const queryString = queryParams.toString();
  const path = queryString
    ? `/product-by-barcode/${barcode}?${queryString}`
    : `/product-by-barcode/${barcode}`;

  return await fetchApi(path);
}

export async function getProductMetaByBarcode(
  barcode: string,
  cityId?: string,
): Promise<ProductMeta> {
  const search = await searchProducts(barcode, cityId);
  const productGroup = search.grouped_results?.find(
    (g) => g.barcode === barcode,
  );
  const productFromGroup = productGroup?.products?.[0];
  const productFromResults = search.results?.find((p) => p.barcode === barcode);
  return {
    name: productFromGroup?.name ?? productFromResults?.name,
    brand: productFromGroup?.brand ?? productFromResults?.brand,
  };
}
