export interface BasketStore {
  client: string;
  store_id: string;
  city: string;
}

export interface BasketItemRequest {
  barcode: string;
  quantity: number;
  name?: string;
  brand?: string;
}

export interface BasketPricesRequestBody {
  stores: BasketStore[];
  basket: BasketItemRequest[];
}

export interface BasketStorePriceItem {
  barcode: string;
  quantity: number;
  name?: string | null;
  brand?: string | null;
  price?: number | null;
  unit_price?: number | null;
  product_name?: string;
  available?: boolean;
  total_price?: number | null;
}

export interface BasketStorePrice {
  client: string;
  store_id: string;
  city: string;
  name: string;
  address: string;
  total?: number | null;
  total_basket_price?: number | null;
  available_items?: number;
  missing_items?: number;
  items: BasketStorePriceItem[];
}

export interface BasketSummary {
  total_items?: number;
}

export interface BasketPricesResponse {
  stores: BasketStorePrice[];
  basket_summary?: BasketSummary;
}
