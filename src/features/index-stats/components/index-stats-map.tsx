"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type MapRef } from "react-map-gl/maplibre";
import dynamic from "next/dynamic";

import type {
  IndexStatsView,
  MapDataPoint,
} from "@/features/index-stats/types";
import {
  computeBoundsFromPoints,
  fitToBounds,
} from "@/features/index-stats/utils";

import { IndexStatsMapLegend } from "./index-stats-map-legend";
import { IndexStatsMapPopup } from "./index-stats-map-popup";

const DynamicIndexStatsMap = dynamic(
  () =>
    import("react-map-gl/maplibre").then((mod) => ({
      default: mod.Map,
    })),
  {
    ssr: false,
  },
);

const DynamicMarker = dynamic(
  () =>
    import("react-map-gl/maplibre").then((mod) => ({
      default: mod.Marker,
    })),
  {
    ssr: false,
  },
);

import "maplibre-gl/dist/maplibre-gl.css";

interface IndexStatsMapProps {
  points: MapDataPoint[];
  view: IndexStatsView;
  cityFilter?: string;
  categoryFilter?: string;
  cityCoordinates?: { latitude: number; longitude: number } | null;
}

function getColor(change: number): string {
  // Muted palette representing severity of price increase
  if (change < 0) return "#34d399"; // emerald-400 (price drop)
  if (change < 2) return "#a3a3a3"; // neutral gray for minimal increase
  if (change < 5) return "#fb923c"; // orange-400 moderate increase
  if (change < 10) return "#f87171"; // red-400 significant increase
  return "#991b1b"; // red-800 major increase
}

function getSize(change: number): number {
  if (change < 0) return 14;
  if (change < 2) return 16;
  if (change < 5) return 20;
  if (change < 10) return 24;
  return 28; // >=10
}

export function IndexStatsMap({
  categoryFilter,
  cityCoordinates,
  cityFilter,
  points,
  view,
}: IndexStatsMapProps) {
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const [selected, setSelected] = useState<MapDataPoint | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);

  // Utility wrappers bound to current refs
  const fitToCurrentBounds = (
    bounds: [[number, number], [number, number]],
    duration = 300,
  ) => fitToBounds(mapRef.current, bounds, containerRef.current, duration);

  // Reset selected popup when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(null);
  }, [view, cityFilter, categoryFilter, points]);

  const sortedPoints = useMemo(
    () =>
      [...points].sort(
        (a: MapDataPoint, b: MapDataPoint) =>
          b.average_change - a.average_change,
      ),
    [points],
  );

  const initialView = useMemo(() => {
    // If a city is selected and we have coordinates, zoom to that city
    if (cityCoordinates && cityFilter && cityFilter !== "all") {
      return {
        longitude: cityCoordinates.longitude,
        latitude: cityCoordinates.latitude,
        zoom: 11, // Closer zoom for city level
      } as const;
    }

    // Default to Croatia center if no points
    if (!points.length) {
      return {
        longitude: 16.4688717,
        latitude: 44.4737849,
        zoom: 5.5,
      } as const;
    }

    const lons = points.map((p: MapDataPoint) => p.longitude);
    const lats = points.map((p: MapDataPoint) => p.latitude);

    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    return {
      longitude: (minLon + maxLon) / 2,
      latitude: (minLat + maxLat) / 2,
      zoom: 5.5,
    } as const;
  }, [points, cityCoordinates, cityFilter]);

  // Handle dynamic view changes when city filter or points change
  // Skip the initial mount - onLoad handles that to avoid jitter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    if (cityCoordinates && cityFilter && cityFilter !== "all") {
      map.flyTo({
        center: [cityCoordinates.longitude, cityCoordinates.latitude],
        zoom: 11,
        duration: 800,
      });
    } else {
      fitToCurrentBounds(computeBoundsFromPoints(points), 800);
    }
  }, [cityCoordinates, cityFilter, points, isMapReady]);

  // Re-fit bounds on container resize (e.g., orientation/mobile layout changes)
  useEffect(() => {
    const el = containerRef.current;
    const map = mapRef.current;
    if (!el || !map) return;

    const observer = new ResizeObserver(() => {
      map.resize();
      if (!cityFilter || cityFilter === "all") {
        fitToCurrentBounds(computeBoundsFromPoints(points), 0);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [cityFilter, points]);

  const INITIAL_DELAY_MS = 300;
  const STAGGER_MS = 5;

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-lg transition-opacity duration-300 ${
        isMapReady ? "opacity-100" : "opacity-0"
      }`}
      ref={containerRef}
    >
      <DynamicIndexStatsMap
        initialViewState={initialView}
        mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        onClick={() => setSelected(null)}
        onLoad={() => {
          if (cityCoordinates && cityFilter && cityFilter !== "all") {
            mapRef.current?.flyTo({
              center: [cityCoordinates.longitude, cityCoordinates.latitude],
              zoom: 11,
              duration: 0,
            });
          } else {
            fitToCurrentBounds(computeBoundsFromPoints(points), 0);
          }
          // Reveal the map now that it's properly positioned
          setIsMapReady(true);
        }}
      >
        {sortedPoints.map((p, i) => (
          <DynamicMarker
            anchor="center"
            key={`${p.name}-${p.latitude}-${p.longitude}`}
            latitude={p.latitude}
            longitude={p.longitude}
            style={{
              zIndex: Math.min(
                49,
                Math.max(1, Math.round(p.average_change * 10) + 1),
              ),
            }}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(p);
            }}
          >
            <div
              className="animate-[scale-in_0.25s_ease-out_forwards] cursor-pointer rounded-full border-2 border-white"
              style={{
                width: getSize(p.average_change),
                height: getSize(p.average_change),
                backgroundColor: getColor(p.average_change),
                opacity: 0, // start invisible
                animationDelay: `${INITIAL_DELAY_MS + i * STAGGER_MS}ms`,
              }}
            />
          </DynamicMarker>
        ))}

        {selected && (
          <IndexStatsMapPopup
            categoryFilter={categoryFilter}
            selected={selected}
            view={view}
            onClose={() => setSelected(null)}
          />
        )}
      </DynamicIndexStatsMap>

      <IndexStatsMapLegend
        legendOpen={legendOpen}
        setLegendOpen={setLegendOpen}
      />
    </div>
  );
}
