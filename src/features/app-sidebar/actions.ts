"use server";

import { setSidebarSearchHistoryOpenCookie } from "@/lib/cookies/app-sidebar";
import {
  getSearchHistoryCookie,
  setSearchHistoryCookie,
} from "@/lib/cookies/search-history";

export async function setSidebarSearchHistoryOpenAction(
  isOpen: boolean,
): Promise<void> {
  await setSidebarSearchHistoryOpenCookie(isOpen);
}

export async function deleteSearchHistoryItemAction(
  index: number,
): Promise<void> {
  const history = await getSearchHistoryCookie();
  const updatedHistory = history.filter((_, i) => i !== index);
  await setSearchHistoryCookie(updatedHistory);
}
