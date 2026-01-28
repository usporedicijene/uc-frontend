import { fetchApi } from "@/fetchApi";

import { type IndexStats } from "./types/index-stats";

export async function getIndexStats(): Promise<IndexStats> {
  return fetchApi("/get-index-statistics");
}
