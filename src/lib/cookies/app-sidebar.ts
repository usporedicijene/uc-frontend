"use server";

import { cookies } from "next/headers";

const SEARCH_HISTORY_OPEN_COOKIE = "sidebar_search_history_open";
const SIDEBAR_STATE_COOKIE = "sidebar_state";

export async function getSidebarStateCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SIDEBAR_STATE_COOKIE)?.value;
  if (value === undefined) return true;
  return value === "true";
}

export async function getSidebarSearchHistoryOpenCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SEARCH_HISTORY_OPEN_COOKIE)?.value;
  if (value === undefined) return false;
  return value === "1";
}

export async function setSidebarSearchHistoryOpenCookie(
  isOpen: boolean,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SEARCH_HISTORY_OPEN_COOKIE, isOpen ? "1" : "0", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
