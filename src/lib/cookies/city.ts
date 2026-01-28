"use server";

import { cookies } from "next/headers";

type CityCookieValue = string;

const COOKIE_NAME = "selectedCity";

export async function getCityIdCookie(): Promise<CityCookieValue> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || "";
}

export async function setCityIdCookie(city: CityCookieValue) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, city, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
