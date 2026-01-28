import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { IndexStatsCategory, IndexStatsView } from "../types";
import { IndexStatsFiltersForm } from "./index-stats-filters-form";

interface IndexStatsFiltersProps {
  cityOptions: string[];
  view: IndexStatsView;
  city: string;
  category: "all" | IndexStatsCategory;
}

export function IndexStatsFilters({
  category,
  city,
  cityOptions,
  view,
}: IndexStatsFiltersProps) {
  const t = useTranslations("IndexStatsFilters");

  const activeFilters = [
    view !== "per_city",
    city !== "all",
    category !== "all",
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile – popover */}
      <div className="w-full lg:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-full justify-between gap-2"
              size="lg"
              variant="outline"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("filtersTitle", { defaultValue: "Filteri" })}
              </div>
              {activeFilters > 0 && (
                <Badge className="h-5 min-w-5 text-xs" variant="default">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[400px] max-w-[90vw] p-4"
            side="bottom"
          >
            <IndexStatsFiltersForm
              cityOptions={cityOptions}
              initialCategory={category}
              initialCity={city}
              initialView={view}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop – inline above summary */}
      <div className="hidden w-full lg:block">
        <IndexStatsFiltersForm
          cityOptions={cityOptions}
          initialCategory={category}
          initialCity={city}
          initialView={view}
        />
      </div>
    </>
  );
}
