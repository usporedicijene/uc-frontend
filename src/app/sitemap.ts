import type { MetadataRoute } from "next";

import { getMarketStats } from "@/api/market-stats";
import { searchProducts } from "@/api/product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://usporedicijene.info";
  const currentDate = new Date();

  // Static pages with their priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/basket`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/markets`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/index-stats`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    // Get market stats and locations to generate dynamic routes
    const [{ markets }] = await Promise.all([getMarketStats()]);

    const marketNames = Object.keys(markets);
    // Major Croatian cities by population/importance (not alphabetically sorted)
    const majorCities = [
      "Zagreb", // Capital and largest city
      "Split", // Second largest city
      "Rijeka", // Third largest city
      "Osijek", // Fourth largest city
      "Zadar", // Fifth largest city
      "Pula", // Major coastal city
      "Slavonski Brod", // Major inland city
      "Karlovac", // Central Croatia
      "Varaždin", // Northern Croatia
      "Šibenik", // Coastal city
      "Sisak", // Central Croatia
      "Velika Gorica", // Zagreb metropolitan area
      "Vinkovci", // Eastern Croatia
      "Koprivnica", // Northern Croatia
      "Čakovec", // Northern Croatia
      "Đakovo", // Eastern Croatia
      "Vukovar", // Eastern Croatia
      "Požega", // Central Croatia
      "Zaprešić", // Zagreb metropolitan area
      "Solin", // Split metropolitan area
    ];

    // Search terms for Croatian grocery products
    const searchTerms = [
      "mlijeko", // milk
      "kava", // coffee
      "kruh", // bread
      "jaja", // eggs
      "sir", // cheese
      "jogurt", // yogurt
      "maslac", // butter
      "meso", // meat
      "piletina", // chicken
      "svinjetina", // pork
      "govedina", // beef
      "riba", // fish
      "riža", // rice
      "tjestenina", // pasta
      "ulje", // oil
      "šećer", // sugar
      "sol", // salt
      "brašno", // flour
      "jabuke", // apples
      "banane", // bananas
      "krumpir", // potatoes
      "rajčice", // tomatoes
      "luk", // onions
      "voće", // fruit
      "povrće", // vegetables
      "pecivo", // pastries
    ];

    // 3. Popular brand + product combinations
    const brandProductTerms = [
      "coca cola", // Coca Cola
      "nutella", // Nutella
      "nivea", // Nivea
      "head shoulders", // Head & Shoulders
      "ariel", // Ariel
      "persil", // Persil
      "fairy", // Fairy
      "dove", // Dove
      "dukat mlijeko", // Dukat milk
      "vindija jogurt", // Vindija yogurt
      "gavrilović", // Gavrilović
      "podravka", // Podravka
      "franck kava", // Franck coffee
      "maestro kava", // Maestro coffee
      "ožujsko pivo", // Ožujsko beer
    ];

    // Combine all search terms
    const allSearchTerms = [...searchTerms, ...brandProductTerms];

    // Generate search term routes
    const searchTermRoutes: MetadataRoute.Sitemap = allSearchTerms.map(
      (term) => ({
        url: `${baseUrl}/?value=${encodeURIComponent(term)}`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.6,
      }),
    );

    // Add filtered index stats URLs for major cities (using real cities from API)
    const indexStatsRoutes: MetadataRoute.Sitemap = majorCities
      .slice(0, 15)
      .map((city) => ({
        url: `${baseUrl}/index-stats?view=per_city&city=${encodeURIComponent(city)}`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.6,
      }));

    // Add market-specific index stats using actual market names from API
    const marketStatsRoutes: MetadataRoute.Sitemap = marketNames.map(
      (market) => ({
        url: `${baseUrl}/index-stats?view=per_market&market=${market}`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.6,
      }),
    );

    // Generate market-stores routes with real barcodes from search results
    const marketStoresRoutes: MetadataRoute.Sitemap = [];
    const MAX_MARKET_STORES_ROUTES = 1000;

    try {
      // Get unique barcodes from search results using our search terms
      const barcodeSet = new Set<string>();

      // Search for products using a subset of our search terms to get real barcodes
      const popularSearchTerms = searchTerms.slice(0, 10); // Use first 10 terms to avoid too many API calls

      for (const term of popularSearchTerms) {
        try {
          const searchResult = await searchProducts(term);
          if (searchResult.results) {
            // Add barcodes from regular results
            searchResult.results.forEach((product) => {
              if (product.barcode && product.barcode.length >= 8) {
                // Valid barcode length
                barcodeSet.add(product.barcode);
              }
            });

            // Add barcodes from grouped results if available
            if (searchResult.grouped_results) {
              searchResult.grouped_results.forEach((group) => {
                if (group.barcode && group.barcode.length >= 8) {
                  barcodeSet.add(group.barcode);
                }
              });
            }
          }
        } catch {
          // Continue with next term if one fails
          continue;
        }
      }

      // Convert to array and limit to top 150 barcodes to keep sitemap manageable
      const uniqueBarcodes = Array.from(barcodeSet).slice(0, 150);

      // Generate routes for each market + barcode combination with cap
      outer: for (const market of marketNames) {
        for (const barcode of uniqueBarcodes) {
          marketStoresRoutes.push({
            url: `${baseUrl}/market-stores/${market}/${barcode}`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.5,
          });
          if (marketStoresRoutes.length >= MAX_MARKET_STORES_ROUTES) {
            break outer;
          }
        }
      }
    } catch {
      // If barcode generation fails, continue without market-stores routes
    }

    return [
      ...staticRoutes,
      ...searchTermRoutes,
      ...indexStatsRoutes,
      ...marketStatsRoutes,
      ...marketStoresRoutes,
    ];
  } catch {
    // Return static routes if dynamic generation fails
    return staticRoutes;
  }
}
