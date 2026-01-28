export interface IndexStats {
  croatia_index: CroatiaIndex;
  per_city: Record<string, CityStats>;
  // Optional aggregated statistics per market or category, depending on backend response
  per_market?: Record<string, CityStats>;
  per_category?: Record<string, CityStats>;
  /** Nested map: city -> category -> stats */
  per_city_category?: Record<string, Record<string, CityStats>>;
  /** Nested map: market -> category -> stats */
  per_market_category?: Record<string, Record<string, CityStats>>;
  /** Nested map: market -> city -> stats */
  per_market_city?: Record<string, Record<string, CityStats>>;
  /** Nested map: market -> city -> category -> stats */
  per_market_city_category?: Record<
    string,
    Record<string, Record<string, CityStats>>
  >;
}

export interface CroatiaIndex {
  average_change: number;
  count: number;
}

export interface CityStats {
  average_change: number;
  count: number;
}
