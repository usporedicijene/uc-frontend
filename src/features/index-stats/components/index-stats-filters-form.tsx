"use client";
import { useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IndexStatsCategory, IndexStatsView } from "../types";

interface IndexStatsFiltersFormProps {
  cityOptions: string[];
  initialCategory: "all" | IndexStatsCategory;
  initialCity: string;
  initialView: IndexStatsView;
}

const CATEGORIES = [
  "Hrana",
  "Kozmetika",
  "Piće",
  "Proizvodi za kućanstvo",
  "Sredstva za čišćenje",
  "Toaletne potrepštine",
];

export function IndexStatsFiltersForm({
  cityOptions,
  initialCategory,
  initialCity,
  initialView,
}: IndexStatsFiltersFormProps) {
  const t = useTranslations("IndexStatsFilters");

  const router = useRouter();
  const searchParams = useSearchParams();

  const [optimisticView, setOptimisticView] = useOptimistic(initialView);
  const [optimisticCity, setOptimisticCity] = useOptimistic(initialCity);
  const [optimisticCategory, setOptimisticCategory] =
    useOptimistic(initialCategory);

  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
      {/* View select */}
      <div className="flex w-full flex-col gap-1 md:w-auto">
        <label className="text-sm font-medium" htmlFor="viewSelect">
          {t("view")}
        </label>
        <Select
          value={optimisticView}
          onValueChange={(value: IndexStatsView) => {
            startTransition(() => {
              setOptimisticView(value);

              const params = new URLSearchParams(searchParams.toString());
              if (value === "per_city") {
                params.delete("view");
              } else {
                params.set("view", value);
              }

              router.push("?" + params.toString(), { scroll: false });
            });
          }}
        >
          <SelectTrigger className="w-full min-w-44" id="viewSelect">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="per_city">
              {t("viewOptions.per_city")}
            </SelectItem>
            <SelectItem value="per_market">
              {t("viewOptions.per_market")}
            </SelectItem>
            <SelectItem value="per_category">
              {t("viewOptions.per_category")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* City filter */}
      <div className="flex w-full flex-col gap-1 md:w-auto">
        <label className="text-sm font-medium" htmlFor="cityFilter">
          {t("city")}
        </label>
        <Select
          value={optimisticCity}
          onValueChange={(value: string) => {
            startTransition(() => {
              setOptimisticCity(value);

              const params = new URLSearchParams(searchParams.toString());
              if (value === "all") {
                params.delete("city");
              } else {
                params.set("city", value);
              }

              router.push("?" + params.toString(), { scroll: false });
            });
          }}
        >
          <SelectTrigger className="w-full min-w-44" id="cityFilter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCities")}</SelectItem>
            {cityOptions.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category filter */}
      <div className="flex w-full flex-col gap-1 md:w-auto">
        <label className="text-sm font-medium" htmlFor="categoryFilter">
          {t("category")}
        </label>
        <Select
          value={optimisticCategory}
          onValueChange={(value: IndexStatsCategory | "all") => {
            startTransition(() => {
              setOptimisticCategory(value);

              const params = new URLSearchParams(searchParams.toString());
              if (value === "all") {
                params.delete("category");
              } else {
                params.set("category", value);
              }

              router.push("?" + params.toString(), { scroll: false });
            });
          }}
        >
          <SelectTrigger className="w-full min-w-44" id="categoryFilter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
