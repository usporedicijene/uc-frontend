import { getTranslations } from "next-intl/server";

import { getIndexStats } from "@/api/index-stats";
import { getAllLocations } from "@/api/locations";
import { IndexStatsFilters } from "@/features/index-stats/components/index-stats-filters";
import { IndexStatsHeading } from "@/features/index-stats/components/index-stats-heading";
import { IndexStatsMap } from "@/features/index-stats/components/index-stats-map";
import { IndexStatsSummary } from "@/features/index-stats/components/index-stats-summary";
import { IndexStatsTable } from "@/features/index-stats/components/index-stats-table";
import { IndexStatsMobileContentWrapper } from "@/features/index-stats/components/mobile-wrapper/index-stats-mobile-content-wrapper";
import {
  createLocationMaps,
  extractTableData,
  generateCategoryMapPoints,
  generateCityMapPoints,
  generateMarketMapPoints,
  getCityCoordinates,
} from "@/features/index-stats/helper";
import type {
  IndexStatsCategory,
  IndexStatsView,
} from "@/features/index-stats/types";

import { IndexStatsPageMetadata } from "./metadata";

export const metadata = IndexStatsPageMetadata;

interface IndexStatsPageProps {
  searchParams?: Promise<{
    view?: IndexStatsView;
    city?: string;
    category?: "all" | IndexStatsCategory;
    mobileView?: "table" | "map";
  }>;
}

export default async function IndexStatsPage({
  searchParams,
}: IndexStatsPageProps) {
  const [params, t, stats, locationsResp] = await Promise.all([
    searchParams,
    getTranslations("IndexStatsPage"),
    getIndexStats(),
    getAllLocations(),
  ]);

  const {
    category = "all",
    city = "all",
    mobileView = "table",
    view = "per_city",
  } = params || {};

  if (!stats?.per_city) {
    return (
      <div className="flex w-full max-w-5xl flex-col gap-4 p-5">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p>{t("noData")}</p>
      </div>
    );
  }

  const dataArray = extractTableData(stats, view, city, category);

  // Create location lookup maps
  const { cityLocationMap, storesByMarket } = createLocationMaps(
    locationsResp.locations,
  );

  // Get city coordinates for map zooming
  const selectedCityCoordinates = getCityCoordinates(cityLocationMap, city);

  // Generate map points based on view type
  const mapPoints =
    view === "per_market"
      ? generateMarketMapPoints(stats, storesByMarket, city, category)
      : view === "per_category"
        ? generateCategoryMapPoints(stats, cityLocationMap, city, category)
        : generateCityMapPoints(dataArray, cityLocationMap, view, category);

  return (
    <div className="flex flex-col gap-3 pb-6 lg:gap-4">
      <div className="bg-background sticky top-14 z-10 pb-3 lg:static lg:bg-transparent lg:pb-0">
        <IndexStatsFilters
          category={category}
          city={city}
          cityOptions={Object.keys(stats.per_city)}
          view={view}
        />
      </div>

      <div className="flex flex-col gap-3 lg:gap-4">
        <div className="pb-2 lg:flex lg:items-end lg:justify-between lg:pb-2">
          <div className="flex w-full flex-col gap-2 lg:w-auto lg:gap-0">
            <IndexStatsHeading
              category={category}
              city={city}
              resultsCount={dataArray.length}
              view={view}
            />
            <div className="mt-1 lg:hidden">
              <IndexStatsSummary
                category={category}
                city={city}
                croatiaIndex={stats.croatia_index}
                dataArray={dataArray}
                view={view}
              />
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:block">
            <IndexStatsSummary
              category={category}
              city={city}
              croatiaIndex={stats.croatia_index}
              dataArray={dataArray}
              view={view}
            />
          </div>
        </div>

        <div>
          <IndexStatsMobileContentWrapper
            mapContent={
              <div className="relative aspect-square h-[480px] w-full overflow-hidden rounded-lg border shadow-md lg:h-auto lg:max-h-[600px]">
                <IndexStatsMap
                  categoryFilter={category !== "all" ? category : ""}
                  cityCoordinates={selectedCityCoordinates}
                  cityFilter={city !== "all" ? city : ""}
                  points={mapPoints}
                  view={view}
                />
              </div>
            }
            mobileView={mobileView}
            tableContent={
              <IndexStatsTable
                data={dataArray}
                key="IndexStatsTable"
                view={view}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
