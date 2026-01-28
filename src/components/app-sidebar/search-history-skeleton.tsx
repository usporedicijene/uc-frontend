import { ChevronDown, HistoryIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

export function SearchHistorySkeleton() {
  const t = useTranslations("SidebarSearchHistoryItem");

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
        </DropdownMenu>
      </SidebarMenuItem>

      {/* Expanded -> Collapsible */}
      <Collapsible
        className="group/collapsible group-data-[collapsible=icon]:hidden group-data-[state=collapsed]:hidden"
        defaultOpen={true}
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
            <div className="max-h-[254px] overflow-y-auto">
              <SidebarMenuSub className="pr-0 group-data-[collapsible=icon]:block">
                <SidebarMenu>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton className="flex items-center gap-2">
                        <div className="bg-muted h-4 w-full max-w-[180px] flex-1 animate-pulse rounded" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarMenuSub>
            </div>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}
