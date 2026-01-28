import { getTranslations } from "next-intl/server";

import { getMarketStats } from "@/api/market-stats";
import { MarketLogo } from "@/components/market-logo";
import {
  FAQSchema,
  marketsFAQs,
} from "@/components/structured-data/faq-schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CurrentDate } from "../../components/current-date";
import { MarketsPageMetadata } from "./metadata";
export const metadata = MarketsPageMetadata;

export default async function MarketsPage() {
  const [t, { markets, total_unique_products }] = await Promise.all([
    getTranslations("MarketsPage"),
    getMarketStats(),
  ]);

  const entries = Object.entries(markets);

  return (
    <>
      <div className="pb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.market")}</TableHead>
              <TableHead className="text-right">
                {t("table.uniqueProductCount")}
              </TableHead>
              <TableHead className="text-right">{t("table.date")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map(([marketKey, stats]) => (
              <TableRow key={marketKey}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MarketLogo marketName={marketKey} size="sm" />
                    <span className="capitalize">
                      {marketKey.replaceAll("-", " ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {stats.unique_product_count.toLocaleString("hr-HR")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  <CurrentDate />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-muted-foreground mt-4 text-sm">
          {t("totalUnique", {
            count: total_unique_products.toLocaleString("hr-HR"),
          })}
        </p>
      </div>
      <FAQSchema faqs={marketsFAQs} />
    </>
  );
}
