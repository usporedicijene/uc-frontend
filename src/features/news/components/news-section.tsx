import { getTranslations } from "next-intl/server";

import { getNews } from "@/api/news";
import {
  ShowMoreProvider,
  ShowMoreRows,
  ShowMoreToggle,
} from "@/components/ui/show-more";

import { NewsItem } from "./news-item";
import { NewsListBlurOverlay } from "./news-list-blur-overlay";

export async function NewsSection() {
  const [newsData, t] = await Promise.all([
    getNews(),
    getTranslations("NewsSheetContent"),
  ]);

  const { news } = newsData;

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-4xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {t("newsTitle")} ({news.length})
          </h2>
        </div>
        <ShowMoreProvider initialVisibleCount={3} totalCount={news.length}>
          <div className="relative">
            <div className="space-y-4">
              <ShowMoreRows>
                {news.map((newsItem) => (
                  <NewsItem key={newsItem.id} newsItem={newsItem} />
                ))}
              </ShowMoreRows>
            </div>
            <NewsListBlurOverlay />
            <div className="relative z-10 flex justify-center">
              <ShowMoreToggle className="mt-4" />
            </div>
          </div>
        </ShowMoreProvider>
      </div>
    </section>
  );
}
