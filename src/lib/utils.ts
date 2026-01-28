import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Product } from "@/api/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorsToCatch === undefined) return [error];
      if (errorsToCatch.some((e) => error instanceof e)) return [error];
      throw error;
    });
}

export function sortProductsByAvailability(products: Product[]): Product[] {
  /*
   * Sorts products by their availability in stores.
   * Availability is defined as the number of results (store records) for each product_id where
   * the `store` field is truthy (not an empty string or null).
   *
   * 1. Higher availability (more stores) comes first.
   * 2. Products with 0 available stores are placed at the bottom.
   * 3. For the same number of available stores, the original order is preserved (stable sort).
   */

  const availabilityCount = products.reduce<Record<string, number>>(
    (acc, product) => {
      const hasStore = Boolean(product.store);
      if (hasStore) {
        acc[product.product_id] = (acc[product.product_id] ?? 0) + 1;
      } else {
        // osiguraj inicijalnu vrijednost 0 za proizvode bez trgovina
        acc[product.product_id] ??= 0;
      }
      return acc;
    },
    {},
  );

  return [...products].sort((a, b) => {
    const countB = availabilityCount[b.product_id] ?? 0;
    const countA = availabilityCount[a.product_id] ?? 0;

    if (countB === countA) {
      // jednak broj - zadrži izvorni poredak (stabilno)
      return 0;
    }
    return countB - countA;
  });
}

export function formatTimestamp(
  timestamp: number,
  t: (key: string, values?: Record<string, number>) => string,
): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) {
    return t("timeAgo.oneMinute");
  } else if (diffInMinutes < 60) {
    return t("timeAgo.minutes", { minutes: diffInMinutes });
  } else if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return t("timeAgo.hours", { hours: diffInHours });
  } else {
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return t("timeAgo.days", { days: diffInDays });
  }
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
