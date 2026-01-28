import type { CityStats, IndexStats } from "@/api/types/index-stats";
import type { StoreLocation } from "@/api/types/locations";
import type {
  IndexStatsView,
  MapDataPoint,
} from "@/features/index-stats/types";

/**
 * Normalizes strings for case-insensitive comparison using Croatian locale
 */
export function normalizeString(s: string): string {
  return s.toLocaleLowerCase("hr-HR");
}

/**
 * Type guard to check if an unknown value is a CityStats object
 */
export function isCityStats(v: unknown): v is CityStats {
  return !!v && typeof v === "object" && "average_change" in v && "count" in v;
}

/**
 * Recursively traverses nested or flattened statistics objects
 * Handles both formats: { "city:category": CityStats } and { city: { category: CityStats } }
 */
export function traverseStats(
  statisticsObject: Record<string, unknown> | undefined,
  onStatsFound: (joinedKey: string, cityStats: CityStats) => void,
  keyPrefix: string[] = [],
): void {
  if (!statisticsObject) return;

  Object.entries(statisticsObject).forEach(([currentKey, currentValue]) => {
    if (isCityStats(currentValue)) {
      onStatsFound([...keyPrefix, currentKey].join(":"), currentValue);
    } else if (currentValue && typeof currentValue === "object") {
      traverseStats(currentValue as Record<string, unknown>, onStatsFound, [
        ...keyPrefix,
        currentKey,
      ]);
    }
  });
}

/**
 * Filters and extracts table data based on view and filter parameters
 */
export function extractTableData(
  statisticsData: IndexStats,
  viewType: IndexStatsView,
  selectedCity: string,
  selectedCategory: string,
): Array<{ name: string; average_change: number; count: number }> {
  const dataArray: Array<{
    name: string;
    average_change: number;
    count: number;
  }> = [];
  const normalize = normalizeString;

  const addRow = (itemName: string, cityStats: CityStats) => {
    dataArray.push({
      name: itemName,
      average_change: cityStats.average_change,
      count: cityStats.count,
    });
  };

  switch (viewType) {
    case "per_city": {
      if (selectedCategory === "all") {
        Object.entries(statisticsData.per_city ?? {}).forEach(
          ([cityName, cityStats]) => {
            if (
              selectedCity === "all" ||
              normalize(cityName) === normalize(selectedCity)
            ) {
              addRow(cityName, cityStats);
            }
          },
        );
      } else {
        traverseStats(
          statisticsData.per_city_category,
          (compositeKey, cityStats) => {
            const [cityName, categoryName] = compositeKey.split(":");
            if (
              (selectedCity === "all" ||
                normalize(cityName) === normalize(selectedCity)) &&
              normalize(categoryName) === normalize(selectedCategory)
            ) {
              addRow(cityName, cityStats);
            }
          },
        );
      }
      break;
    }

    case "per_market": {
      if (selectedCategory === "all" && selectedCity === "all") {
        Object.entries(statisticsData.per_market ?? {}).forEach(
          ([marketName, marketStats]) => addRow(marketName, marketStats),
        );
      } else if (selectedCategory === "all" && selectedCity !== "all") {
        traverseStats(
          statisticsData.per_market_city,
          (compositeKey, cityStats) => {
            const [marketName, cityName] = compositeKey.split(":");
            if (normalize(cityName) === normalize(selectedCity)) {
              addRow(marketName, cityStats);
            }
          },
        );
      } else if (selectedCategory !== "all" && selectedCity === "all") {
        traverseStats(
          statisticsData.per_market_category,
          (compositeKey, categoryStats) => {
            const [marketName, categoryName] = compositeKey.split(":");
            if (normalize(categoryName) === normalize(selectedCategory)) {
              addRow(marketName, categoryStats);
            }
          },
        );
      } else {
        traverseStats(
          statisticsData.per_market_city_category,
          (compositeKey, cityStats) => {
            const [marketName, cityName, categoryName] =
              compositeKey.split(":");
            if (
              normalize(cityName) === normalize(selectedCity) &&
              normalize(categoryName) === normalize(selectedCategory)
            ) {
              addRow(marketName, cityStats);
            }
          },
        );
      }
      break;
    }

    case "per_category": {
      if (selectedCity === "all") {
        Object.entries(statisticsData.per_category ?? {}).forEach(
          ([categoryName, categoryStats]) => {
            if (
              selectedCategory === "all" ||
              normalize(categoryName) === normalize(selectedCategory)
            ) {
              addRow(categoryName, categoryStats);
            }
          },
        );
      } else {
        traverseStats(
          statisticsData.per_city_category,
          (compositeKey, cityStats) => {
            const [cityName, categoryName] = compositeKey.split(":");
            if (
              normalize(cityName) === normalize(selectedCity) &&
              (selectedCategory === "all" ||
                normalize(categoryName) === normalize(selectedCategory))
            ) {
              addRow(categoryName, cityStats);
            }
          },
        );
      }
      break;
    }
  }

  return dataArray;
}

/**
 * Creates location lookup maps from location data
 */
export function createLocationMaps(locations: StoreLocation[]) {
  // 1. Aggregate all store coordinates per city so we can compute the average
  const aggregatedByCity: Record<
    string,
    { latSum: number; lonSum: number; count: number; sample: StoreLocation }
  > = {};

  locations
    .filter(
      (location) => location.city && location.latitude && location.longitude,
    )
    .forEach((location) => {
      const key = location.city!.toLowerCase();
      if (!aggregatedByCity[key]) {
        aggregatedByCity[key] = {
          latSum: location.latitude!,
          lonSum: location.longitude!,
          count: 1,
          sample: location, // keep a reference to fill non-coordinate fields later
        };
      } else {
        aggregatedByCity[key].latSum += location.latitude!;
        aggregatedByCity[key].lonSum += location.longitude!;
        aggregatedByCity[key].count += 1;
      }
    });

  // 2. Convert the aggregates into a Map<city, StoreLocation> where latitude/longitude are averages
  const cityLocationMap = new Map<string, StoreLocation>(
    Object.entries(aggregatedByCity).map(([cityKey, agg]) => {
      const avgLat = agg.latSum / agg.count;
      const avgLon = agg.lonSum / agg.count;

      return [
        cityKey,
        {
          ...agg.sample,
          latitude: avgLat,
          longitude: avgLon,
        } as StoreLocation,
      ];
    }),
  );

  const storesByMarket = locations
    .filter(
      (location) => location.client && location.latitude && location.longitude,
    )
    .reduce(
      (marketAccumulator, currentLocation) => {
        const marketKey = currentLocation.client.toLowerCase();
        (marketAccumulator[marketKey] ??= []).push(currentLocation);
        return marketAccumulator;
      },
      {} as Record<string, StoreLocation[]>,
    );

  return { cityLocationMap, storesByMarket };
}

/**
 * Extracts coordinates for a specific city from location map
 */
export function getCityCoordinates(
  cityLocationMap: Map<string, StoreLocation>,
  selectedCity: string,
): { latitude: number; longitude: number } | null {
  if (selectedCity === "all") return null;

  const cityLocation = cityLocationMap.get(selectedCity.toLowerCase());
  return cityLocation?.latitude && cityLocation?.longitude
    ? { latitude: cityLocation.latitude, longitude: cityLocation.longitude }
    : null;
}

/**
 * Generates map points for market view showing individual store locations
 */
export function generateMarketMapPoints(
  statisticsData: IndexStats,
  storesByMarket: Record<string, StoreLocation[]>,
  selectedCity: string,
  selectedCategory: string,
): MapDataPoint[] {
  const mapPoints: MapDataPoint[] = [];
  const normalize = normalizeString;

  const addStorePoints = (
    marketName: string,
    cityName: string,
    marketStats: CityStats,
  ) => {
    const marketStores =
      storesByMarket[marketName.toLowerCase()]?.filter(
        (storeLocation) =>
          storeLocation.city &&
          normalize(storeLocation.city) === normalize(cityName),
      ) || [];

    marketStores.forEach((storeLocation, storeIndex) => {
      mapPoints.push({
        name: `${marketName}${marketStores.length > 1 ? ` (${storeIndex + 1})` : ""}`,
        latitude: storeLocation.latitude!,
        longitude: storeLocation.longitude!,
        average_change: marketStats.average_change,
        count: marketStats.count,
        market: marketName,
        city: storeLocation.city || undefined,
        address: storeLocation.address || undefined,
      });
    });
  };

  const statisticsSource =
    selectedCategory === "all"
      ? statisticsData.per_market_city
      : statisticsData.per_market_city_category;

  traverseStats(statisticsSource, (compositeKey, cityStats) => {
    const keyParts = compositeKey.split(":");
    const [marketName, cityName, categoryName] = keyParts;

    const cityMatches =
      selectedCity === "all" || normalize(cityName) === normalize(selectedCity);
    const categoryMatches =
      selectedCategory === "all" ||
      normalize(categoryName || "") === normalize(selectedCategory);

    if (cityMatches && categoryMatches) {
      addStorePoints(marketName, cityName, cityStats);
    }
  });

  return mapPoints;
}

/**
 * Generates map points for city views showing city locations
 */
export function generateCityMapPoints(
  tableDataRows: Array<{ name: string; average_change: number; count: number }>,
  cityLocationMap: Map<string, StoreLocation>,
  viewType: IndexStatsView,
  selectedCategory: string,
): MapDataPoint[] {
  const mapPoints: MapDataPoint[] = [];

  tableDataRows.forEach((dataRow) => {
    const cityLocation = cityLocationMap.get(dataRow.name.toLowerCase());
    if (cityLocation) {
      mapPoints.push({
        name: dataRow.name,
        latitude: cityLocation.latitude!,
        longitude: cityLocation.longitude!,
        average_change: dataRow.average_change,
        count: dataRow.count,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
    }
  });

  return mapPoints;
}

/**
 * Generates map points for category view showing cities with category data
 */
export function generateCategoryMapPoints(
  statisticsData: IndexStats,
  cityLocationMap: Map<string, StoreLocation>,
  selectedCity: string,
  selectedCategory: string,
): MapDataPoint[] {
  const mapPoints: MapDataPoint[] = [];
  const normalize = normalizeString;

  if (selectedCity === "all") {
    // Show all cities with their category-specific data
    if (selectedCategory === "all") {
      // Show all cities with breakdown of all categories
      Object.entries(statisticsData.per_city ?? {}).forEach(
        ([cityName, cityStats]) => {
          const cityLocation = cityLocationMap.get(cityName.toLowerCase());
          if (cityLocation) {
            // Get category breakdown for this city
            const categoryBreakdown: Record<
              string,
              { average_change: number; count: number }
            > = {};

            traverseStats(
              statisticsData.per_city_category,
              (compositeKey, stats) => {
                const [keyCityName, categoryName] = compositeKey.split(":");
                if (normalize(keyCityName) === normalize(cityName)) {
                  categoryBreakdown[categoryName] = {
                    average_change: stats.average_change,
                    count: stats.count,
                  };
                }
              },
            );

            mapPoints.push({
              name: cityName,
              latitude: cityLocation.latitude!,
              longitude: cityLocation.longitude!,
              average_change: cityStats.average_change,
              count: cityStats.count,
              categoryBreakdown,
            });
          }
        },
      );
    } else {
      // Show all cities but only for the selected category
      traverseStats(
        statisticsData.per_city_category,
        (compositeKey, cityStats) => {
          const [cityName, categoryName] = compositeKey.split(":");
          if (normalize(categoryName) === normalize(selectedCategory)) {
            const cityLocation = cityLocationMap.get(cityName.toLowerCase());
            if (cityLocation) {
              mapPoints.push({
                name: cityName,
                latitude: cityLocation.latitude!,
                longitude: cityLocation.longitude!,
                average_change: cityStats.average_change,
                count: cityStats.count,
                category: categoryName,
              });
            }
          }
        },
      );
    }
  } else {
    // Show only the selected city with category breakdown
    const cityLocation = cityLocationMap.get(selectedCity.toLowerCase());
    if (cityLocation) {
      if (selectedCategory === "all") {
        // Get all categories for this city
        const categoryBreakdown: Record<
          string,
          { average_change: number; count: number }
        > = {};

        traverseStats(
          statisticsData.per_city_category,
          (compositeKey, stats) => {
            const [keyCityName, categoryName] = compositeKey.split(":");
            if (normalize(keyCityName) === normalize(selectedCity)) {
              categoryBreakdown[categoryName] = {
                average_change: stats.average_change,
                count: stats.count,
              };
            }
          },
        );

        // Use overall city stats for the main point
        const cityStats = statisticsData.per_city?.[selectedCity];
        if (cityStats) {
          mapPoints.push({
            name: selectedCity,
            latitude: cityLocation.latitude!,
            longitude: cityLocation.longitude!,
            average_change: cityStats.average_change,
            count: cityStats.count,
            categoryBreakdown,
          });
        }
      } else {
        // Show only the selected city and category
        traverseStats(
          statisticsData.per_city_category,
          (compositeKey, cityStats) => {
            const [cityName, categoryName] = compositeKey.split(":");
            if (
              normalize(cityName) === normalize(selectedCity) &&
              normalize(categoryName) === normalize(selectedCategory)
            ) {
              mapPoints.push({
                name: selectedCity,
                latitude: cityLocation.latitude!,
                longitude: cityLocation.longitude!,
                average_change: cityStats.average_change,
                count: cityStats.count,
                category: categoryName,
              });
            }
          },
        );
      }
    }
  }

  return mapPoints;
}
