"use server";

import { cookies } from "next/headers";

import type { BasketItemRequest } from "@/api/types/basket";
import type { StoreLocation } from "@/api/types/locations";

const LOCATIONS_COOKIE = "basket_locations";
const ITEMS_COOKIE = "basket_items";

async function setCookie(name: string, value: unknown) {
  const cookieStore = await cookies();
  cookieStore.set(name, encodeURIComponent(JSON.stringify(value)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

async function getParsedCookie<T>(name: string, fallback: T): Promise<T> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(name)?.value;
  if (!raw) return fallback;
  try {
    return JSON.parse(decodeURIComponent(raw)) as T;
  } catch {
    return fallback;
  }
}

export async function getBasketLocationsCookie(): Promise<StoreLocation[]> {
  return await getParsedCookie<StoreLocation[]>(LOCATIONS_COOKIE, []);
}

export async function setBasketLocationsCookie(
  locations: StoreLocation[],
): Promise<void> {
  await setCookie(LOCATIONS_COOKIE, locations);
}

export async function getBasketItemsCookie(): Promise<BasketItemRequest[]> {
  return await getParsedCookie<BasketItemRequest[]>(ITEMS_COOKIE, []);
}

export async function setBasketItemsCookie(
  items: BasketItemRequest[],
): Promise<void> {
  await setCookie(ITEMS_COOKIE, items);
}
