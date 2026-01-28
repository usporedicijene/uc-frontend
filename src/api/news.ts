import { fetchApi } from "@/fetchApi";

import { GetNewsResponse } from "./types/news";

export async function getNews(): Promise<GetNewsResponse> {
  return await fetchApi("/mobile-news");
}
