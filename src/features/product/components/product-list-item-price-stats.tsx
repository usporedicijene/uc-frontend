import { useTranslations } from "next-intl";

interface ProductPriceStatisticsProps {
  minPrice: number;
  maxPrice: number;
}

export function ProductListItemPriceStats({
  maxPrice,
  minPrice,
}: ProductPriceStatisticsProps) {
  const t = useTranslations("ProductListItemPriceStats");

  return (
    <div className="mb-4 rounded-xl border bg-gradient-to-r from-emerald-50/80 to-rose-50/80 p-4 dark:from-emerald-950/20 dark:to-rose-950/20">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
            {t("tableLowest")}
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {Number.isFinite(minPrice) ? `€${minPrice.toFixed(2)}` : "—"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
            {t("tableHighest")}
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {Number.isFinite(maxPrice) ? `€${maxPrice.toFixed(2)}` : "—"}
          </div>
        </div>
      </div>
      {Number.isFinite(minPrice) &&
        Number.isFinite(maxPrice) &&
        minPrice !== maxPrice && (
          <div className="border-border mt-3 border-t pt-3 text-center">
            <div className="text-muted-foreground text-xs font-medium">
              {t("maxSavings")}{" "}
              <span className="font-semibold text-emerald-600">
                €{(maxPrice - minPrice).toFixed(2)}
              </span>
            </div>
          </div>
        )}
    </div>
  );
}
