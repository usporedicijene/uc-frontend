"use server";

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

const COOKIE_NAME = "searchHistory";

import { cookies } from "next/headers";

export async function getSearchHistoryCookie(): Promise<SearchHistoryItem[]> {
  const cookieStore = await cookies();
  const historyString = cookieStore.get(COOKIE_NAME)?.value;

  if (!historyString) return [];

  try {
    return JSON.parse(decodeURIComponent(historyString)) as SearchHistoryItem[];
  } catch {
    return [];
  }
}

export async function setSearchHistoryCookie(
  items: SearchHistoryItem[],
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(items), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}
