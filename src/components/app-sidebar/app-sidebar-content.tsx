import { Suspense } from "react";
import { ShoppingCart, Store, Table2 } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SearchHistorySkeleton } from "./search-history-skeleton";
import { SidebarSearchHistoryItem } from "./sidebar-search-history-item";

export async function AppSidebarContent() {
  const t = await getTranslations("AppSidebarContent");

  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>{t("compareLabel")}</SidebarGroupLabel>
          <Suspense fallback={<SearchHistorySkeleton />}>
            <SidebarSearchHistoryItem />
          </Suspense>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="relative z-10"
              tooltip={t("basket")}
            >
              <Link href="/basket">
                <ShoppingCart className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {t("basket")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("stats")}</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t("statistics")}>
              <Link href="/index-stats" prefetch={false}>
                <Table2 className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {t("statistics")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t("markets")}>
              <Link href="/markets">
                <Store className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {t("productCounts")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarMenu>
    </SidebarContent>
  );
}
