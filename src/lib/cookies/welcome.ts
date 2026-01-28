"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "welcome_seen";

export async function getWelcomeSeenCookie(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || "";
}

export async function setWelcomeSeenCookie(value: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
