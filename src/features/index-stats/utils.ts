import type { MapRef } from "react-map-gl/maplibre";

import type { MapDataPoint } from "@/features/index-stats/types";

export type LonLatBounds = [[number, number], [number, number]];

// Conservative bounding box for Croatia
export const DEFAULT_CROATIA_BOUNDS: LonLatBounds = [
  [13.0, 42.0],
  [19.6, 46.9],
];

export function computeBoundsFromPoints(points: MapDataPoint[]): LonLatBounds {
  if (!points || points.length === 0) return DEFAULT_CROATIA_BOUNDS;

  const longitudes = points.map((p) => p.longitude);
  const latitudes = points.map((p) => p.latitude);

  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  return [
    [minLon, minLat],
    [maxLon, maxLat],
  ];
}

export function getDynamicPaddingFromElement(
  container: HTMLElement | null,
): number {
  if (!container) return 40;
  const rect = container.getBoundingClientRect();
  const base = Math.min(rect.width, rect.height) * 0.06; // ~6% of smaller dimension
  return Math.max(24, Math.min(80, Math.round(base)));
}

export function fitToBounds(
  map: MapRef | null,
  bounds: LonLatBounds,
  container?: HTMLElement | null,
  duration = 300,
): void {
  if (!map) return;
  const padding = getDynamicPaddingFromElement(container ?? null);
  map.fitBounds(bounds, { padding, duration });
}
