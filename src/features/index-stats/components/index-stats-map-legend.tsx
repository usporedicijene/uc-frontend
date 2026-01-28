"use client";

import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IndexStatsMapLegendProps {
  legendOpen: boolean;
  setLegendOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export function IndexStatsMapLegend({
  legendOpen,
  setLegendOpen,
}: IndexStatsMapLegendProps) {
  const t = useTranslations("IndexStatsMapLegend");

  return (
    <div className="pointer-events-none absolute right-[6px] bottom-12 z-50 flex flex-col items-end gap-2">
      {legendOpen && (
        <div className="pointer-events-auto rounded-md bg-white/90 p-3 text-sm text-gray-900 shadow">
          <div className="mb-2 font-semibold">{t("title")}</div>
          <ul className="flex flex-row flex-wrap gap-4">
            <li className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full bg-[#34d399]" />
              {t("lt0")}
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full bg-[#a3a3a3]" />
              {t("0to2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full bg-[#fb923c]" />
              {t("2to5")}
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full bg-[#f87171]" />
              {t("5to10")}
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-3 rounded-full bg-[#991b1b]" />
              {t("gt10")}
            </li>
          </ul>
        </div>
      )}

      {/* Toggle Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-white/90 shadow"
            type="button"
            onClick={() => setLegendOpen((prev) => !prev)}
          >
            <Layers className="h-4 w-4 text-gray-700" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">{t("tooltip")}</TooltipContent>
      </Tooltip>
    </div>
  );
}
