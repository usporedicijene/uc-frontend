"use server";

import { setSidebarSearchHistoryOpenCookie } from "@/lib/cookies/app-sidebar";
import {
  getSearchHistoryCookie,
  setSearchHistoryCookie,
} from "@/lib/cookies/search-history";

const MAX_SEARCH_HISTORY_ITEMS = 10;

export async function saveSearchQueryAction(query: string): Promise<void> {
  const currentHistory = await getSearchHistoryCookie();
  const wasEmpty = currentHistory.length === 0;

  const filteredHistory = currentHistory.filter((item) => item.query !== query);

  const newHistory = [
    { query, timestamp: Date.now() },
    ...filteredHistory,
  ].slice(0, MAX_SEARCH_HISTORY_ITEMS);

  await setSearchHistoryCookie(newHistory);

  if (wasEmpty) {
    await setSidebarSearchHistoryOpenCookie(true);
  }
}
