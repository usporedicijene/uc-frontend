// Common store names that appear across multiple metadata files
export const STORE_NAMES = [
  "Konzum",
  "Kaufland",
  "Lidl",
  "Spar",
  "Plodine",
  "Studenac",
  "DM",
] as const;

// Store names in different grammatical cases for Croatian
export const STORE_NAMES_LOCATIVE = [
  "Konzumu",
  "Kauflandu",
  "Lidlu",
  "Sparu",
  "Plodinama",
  "Studencu",
  "DM-u",
] as const;

// Keywords that appear across multiple pages
export const COMMON_KEYWORDS = [
  "usporedi cijene",
  "cijene proizvoda hrvatska",
  "trgovine hrvatska",
  "najbolje cijene",
  "usporedba cijena",
] as const;

// Store-specific keywords for individual store pages
export const STORE_KEYWORDS = STORE_NAMES.map(
  (store) => `${store.toLowerCase()} hrvatska`,
);

// Base constants
export const BASE_URL = "https://usporedicijene.info" as const;

// Helper function to create store list text
export function createStoreListText(): string {
  const lastStore = STORE_NAMES_LOCATIVE[STORE_NAMES_LOCATIVE.length - 1];
  const otherStores = STORE_NAMES_LOCATIVE.slice(0, -1).join(", ");
  return `${otherStores} i ${lastStore}`;
}

// Helper function to create "više od X trgovačkih lanaca" text
export function getTradingChainsText(): string {
  return `više od ${STORE_NAMES.length + 8} trgovačkih lanaca`; // +8 for other stores not explicitly mentioned
}
