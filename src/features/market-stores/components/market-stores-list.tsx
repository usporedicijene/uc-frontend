import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import type { MarketStoreEntry } from "@/api/types/market-stores";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MarketStoresPriceBadge } from "./market-stores-price-badge";

interface MarketStoresListProps {
  stores: MarketStoreEntry[];
}

export function MarketStoresList({ stores }: MarketStoresListProps) {
  const t = useTranslations("MarketStoresList");

  const numericPrices = stores
    .map((s) => Number(s.price))
    .filter((n) => Number.isFinite(n));
  const hasPrices = numericPrices.length > 0;
  const minPrice = hasPrices ? Math.min(...numericPrices) : undefined;
  const maxPrice = hasPrices ? Math.max(...numericPrices) : undefined;

  return (
    <Card className="p-3 shadow-sm">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[60%]">{t("table.address")}</TableHead>
                <TableHead className="w-[20%] whitespace-nowrap">
                  {t("table.city")}
                </TableHead>
                <TableHead className="w-[20%] text-right">
                  {t("table.price")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => {
                const price = Number(store.price);
                const isCheapest = hasPrices && price === minPrice;
                const isHighest =
                  hasPrices &&
                  maxPrice !== undefined &&
                  minPrice !== undefined &&
                  price === maxPrice &&
                  maxPrice > minPrice;
                const query = encodeURIComponent(
                  `${store.address}, ${store.city}`,
                );
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

                return (
                  <TableRow className="hover:bg-transparent" key={store.id}>
                    <TableCell>
                      <a
                        aria-label={`${t("openInMaps")} - ${store.address}`}
                        className="hover:text-primary inline-flex w-full items-start gap-2"
                        href={mapsUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={store.address}
                      >
                        <MapPin className="text-primary size-4" />
                        <span className="max-w-[28rem] break-words whitespace-normal sm:max-w-[36rem] md:max-w-[44rem]">
                          {store.address}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell title={store.city}>
                      <span className="block max-w-[12rem] break-words whitespace-normal sm:max-w-[14rem] md:max-w-[16rem]">
                        {store.city}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <MarketStoresPriceBadge
                        isCheapest={Boolean(isCheapest)}
                        isHighest={Boolean(isHighest)}
                        price={price}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
