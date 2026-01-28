export interface MarketStoreEntry {
  id: string;
  address: string;
  city: string;
  zip: string | null;
  price: number;
}

export interface GetMarketStoresResponse {
  market: string;
  barcode: string;
  stores: MarketStoreEntry[];
  found: boolean;
}
