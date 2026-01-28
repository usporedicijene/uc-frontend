import { Suspense } from "react";

import { searchProducts } from "@/api/product";
import {
  FAQSchema,
  homepageFAQs,
} from "@/components/structured-data/faq-schema";
import { ValidDatePrice } from "@/components/valid-date-price";
import { CityChooserWrapper } from "@/features/city/components/city-chooser-wrapper";
import { NewsSection } from "@/features/news/components/news-section";
import { NewsSectionSkeleton } from "@/features/news/components/news-section-skeleton";
import { ProductList } from "@/features/product/components/product-list";
import { ProductListEmpty } from "@/features/product/components/product-list-empty";
import { ProductSearchLoading } from "@/features/product/components/product-search-loading";
import { ProductSearchBar } from "@/features/product/components/product-searchbar";
import { getCityIdCookie } from "@/lib/cookies/city";

import { MainPageSearchMetadata } from "./metadata";

export const metadata = MainPageSearchMetadata;

interface HomePageProps {
  searchParams: Promise<{ value: string }>;
}

async function HomePageContent({ searchParams }: HomePageProps) {
  const [{ value }, cityId] = await Promise.all([
    Promise.resolve(searchParams),
    getCityIdCookie(),
  ]);

  const { grouped_results = [], total_unique } = await searchProducts(
    value,
    cityId,
  );

  const filteredResults = grouped_results.filter(
    (result) => result.market_count > 0,
  );

  if (filteredResults.length === 0) {
    return <ProductListEmpty searchedValue={value} />;
  }

  return (
    <ProductList
      cityId={cityId}
      displayedCount={Math.min(20, filteredResults.length)}
      groupedProducts={filteredResults.slice(0, 20)}
      searchedValue={value}
      totalUnique={total_unique}
    />
  );
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <>
      <ProductSearchBar
        cityChooser={
          <Suspense>
            <CityChooserWrapper />
          </Suspense>
        }
        newsSection={
          <Suspense fallback={<NewsSectionSkeleton />}>
            <NewsSection />
          </Suspense>
        }
        priceInfo={
          <Suspense>
            <ValidDatePrice />
          </Suspense>
        }
      >
        <Suspense fallback={<ProductSearchLoading />}>
          <HomePageContent searchParams={searchParams} />
        </Suspense>
      </ProductSearchBar>
      <FAQSchema faqs={homepageFAQs} />
    </>
  );
}
