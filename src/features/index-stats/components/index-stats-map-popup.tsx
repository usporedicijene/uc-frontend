"use client";

import { Popup } from "react-map-gl/maplibre";
import { useTranslations } from "next-intl";

import type {
  IndexStatsView,
  MapDataPoint,
} from "@/features/index-stats/types";
import { capitalize } from "@/lib/utils";

interface IndexStatsMapPopupProps {
  selected: MapDataPoint;
  view: IndexStatsView;
  categoryFilter?: string;
  onClose: () => void;
}

export function IndexStatsMapPopup({
  categoryFilter,
  onClose,
  selected,
  view,
}: IndexStatsMapPopupProps) {
  const t = useTranslations("IndexStatsMapPopup");

  function renderPopupContent(point: MapDataPoint) {
    switch (view) {
      case "per_city":
        return (
          <div className="flex flex-col text-sm text-gray-900">
            <span className="font-semibold">{capitalize(point.name)}</span>
            <span>
              {t("change", { change: point.average_change.toFixed(2) })}
            </span>
            <span>
              {t("sampleCount", { count: point.count.toLocaleString() })}
            </span>
            {categoryFilter && categoryFilter !== "all" && (
              <span className="mt-1 text-xs text-gray-600">
                {t("category", { category: categoryFilter })}
              </span>
            )}
          </div>
        );

      case "per_market":
        return (
          <div className="flex flex-col text-sm text-gray-900">
            <span className="font-semibold">{capitalize(point.name)}</span>
            {(point.city || point.address) && (
              <span className="text-xs text-gray-600">
                {point.address ?? ""}
                {point.address && point.city ? ", " : ""}
                {point.city ? capitalize(point.city) : ""}
              </span>
            )}
            <span>
              {t("change", { change: point.average_change.toFixed(2) })}
            </span>
            <span>
              {t("sampleCount", { count: point.count.toLocaleString() })}
            </span>
            {categoryFilter && categoryFilter !== "all" && (
              <span className="mt-1 text-xs text-gray-600">
                {t("category", { category: categoryFilter })}
              </span>
            )}
          </div>
        );

      case "per_category":
        return (
          <div className="flex flex-col text-sm text-gray-900">
            <span className="font-semibold">{capitalize(point.name)}</span>
            {point.categoryBreakdown ? (
              <div className="mt-2">
                <span className="text-xs font-medium">{t("categories")}</span>
                {Object.entries(point.categoryBreakdown).map(([cat, data]) => (
                  <div className="flex justify-between text-xs" key={cat}>
                    <span>{cat}:</span>
                    <span>{data.average_change.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <span>
                  {t("change", { change: point.average_change.toFixed(2) })}
                </span>
                <span>
                  {t("sampleCount", { count: point.count.toLocaleString() })}
                </span>
                {point.category && (
                  <span className="mt-1 text-xs text-gray-600">
                    {point.category}
                  </span>
                )}
              </>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-col text-sm text-gray-900">
            <span className="font-semibold">{capitalize(point.name)}</span>
            <span>
              {t("change", { change: point.average_change.toFixed(2) })}
            </span>
            <span>
              {t("sampleCount", { count: point.count.toLocaleString() })}
            </span>
          </div>
        );
    }
  }

  return (
    <Popup
      className="z-50"
      closeButton={true}
      closeOnClick={false}
      focusAfterOpen={false}
      latitude={selected.latitude}
      longitude={selected.longitude}
      offset={25}
      onClose={onClose}
    >
      {renderPopupContent(selected)}
    </Popup>
  );
}
