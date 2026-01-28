import { ChevronDown, HistoryIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { getSidebarSearchHistoryOpenCookie } from "@/lib/cookies/app-sidebar";
import { getSearchHistoryCookie } from "@/lib/cookies/search-history";

import {
  CollapsibleContent,
  CollapsibleTrigger,
  PersistentCollapsible,
} from "./persistent-collapsible";
import { SearchHistory } from "./search-history";
import { SearchHistoryDropdown } from "./search-history-dropdown";

export async function SidebarSearchHistoryItem() {
  const [defaultOpen, history, t, tSearchHistory] = await Promise.all([
    getSidebarSearchHistoryOpenCookie(),
    getSearchHistoryCookie(),
    getTranslations("SidebarSearchHistoryItem"),
    getTranslations("SearchHistory"),
  ]);

  return (
    <>
      {/* Collapsed -> Dropdown */}
      <SidebarMenuItem className="hidden group-data-[collapsible=icon]:w-8 group-data-[state=expanded]:hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="cursor-pointer"
              size="sm"
              tooltip={t("searchHistory") as string}
            >
              <HistoryIcon className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <SearchHistoryDropdown />
        </DropdownMenu>
      </SidebarMenuItem>

      {/* Expanded -> Collapsible */}
      <PersistentCollapsible
        className="group/collapsible group-data-[collapsible=icon]:hidden group-data-[state=collapsed]:hidden"
        defaultOpen={defaultOpen}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              closeOnClickOnMobile={false}
              tooltip={t("searchHistory") as string}
            >
              <HistoryIcon className="size-4" />
              <span className="whitespace-nowrap">{t("searchHistory")}</span>
              <ChevronDown className="ml-auto size-4 transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="pr-0 group-data-[collapsible=icon]:block">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <HistoryIcon className="text-muted-foreground mb-2 size-8" />
                  <p className="text-muted-foreground text-sm">
                    {tSearchHistory("empty")}
                  </p>
                </div>
              ) : (
                <SearchHistory items={history} />
              )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </PersistentCollapsible>
    </>
  );
}
