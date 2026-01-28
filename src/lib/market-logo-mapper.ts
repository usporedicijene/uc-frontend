/**
 * Get the logo path for a market name
 * @param marketName - The market name from the API
 * @returns The logo image path or null if no logo exists
 */
export function getMarketLogo(marketName: string): string | null {
  if (!marketName) return null;

  const normalizedName = marketName.toLowerCase().trim();

  return `/store-logos/${normalizedName}.png`;
}
