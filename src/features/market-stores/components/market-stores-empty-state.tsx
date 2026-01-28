import { getTranslations } from "next-intl/server";

export async function MarketStoresEmptyState() {
  const t = await getTranslations("MarketStores");
  return (
    <div className="text-muted-foreground rounded-md border p-6 text-center text-sm">
      {t("notFound")}
    </div>
  );
}
