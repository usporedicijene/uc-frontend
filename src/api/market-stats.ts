import { fetchApi } from "@/fetchApi";

import { MarketStatsResponse } from "./types/market-stats";

export async function getMarketStats(): Promise<MarketStatsResponse> {
  return await fetchApi("/market-stats");
}
