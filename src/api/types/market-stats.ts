export interface SingleMarketStats {
  product_count: number;
  unique_product_count: number;
}

export interface MarketStatsResponse {
  markets: Record<string, SingleMarketStats>;
  total_unique_products: number;
}
