export interface Product {
  product_id: string;
  barcode: string;
  name: string;
  brand: string;
  store: string;
  price: number;
}

export interface SearchProductsResponse {
  results: Product[];
  grouped_results?: GroupedResult[];
  search_value: string;
  search_type: string;
  total: number;
  total_unique: number;
  limited: boolean;
  error: string | null;
}

export interface GroupedResult {
  barcode: string;
  products: Product[];
  count: number;
  market_count: number;
}

export interface MarketPrice {
  id: string;
  name: string;
  available: boolean;
  min_price: number | null;
  max_price: number | null;
  avg_price: number | null;
}

export interface GetProductByBarcodeResponse {
  barcode: string;
  markets: Record<string, MarketPrice>;
  found: boolean;
}

export interface ProductMeta {
  name?: string;
  brand?: string;
}
