export type IndexStatsView = "per_city" | "per_market" | "per_category";

export type IndexStatsCategory =
  | "Hrana"
  | "Kozmetika"
  | "Piće"
  | "Proizvodi za kućanstvo"
  | "Sredstva za čišćenje"
  | "Toaletne potrepštine";

// Shared map data structure used across multiple components (map visualization, pages, etc.)
export interface MapDataPoint {
  name: string;
  latitude: number;
  longitude: number;
  average_change: number;
  count: number;
  // Additional data for different views
  city?: string; // For market view
  market?: string; // For market view
  category?: string; // For category view
  categoryBreakdown?: Record<string, { average_change: number; count: number }>; // For category tooltip
  address?: string; // Physical address for market view popup
}
