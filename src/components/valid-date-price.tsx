import { Info } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getValidDataDate } from "@/api/valid-data-date";

export async function ValidDatePrice() {
  const [t, { valid_data_date }] = await Promise.all([
    getTranslations("AppSidebarPriceInfo"),
    getValidDataDate(),
  ]);

  const date = new Date(valid_data_date).toLocaleDateString("hr-HR");

  return (
    <div className="flex cursor-default items-center">
      <Info className="hidden size-4 group-data-[collapsible=icon]:block" />
      <span className="text-muted-foreground text-xs group-data-[collapsible=icon]:hidden">
        {t("pricesOnDate")}
        <span className="text-foreground/80 ml-1 font-medium">{date}</span>
      </span>
    </div>
  );
}
