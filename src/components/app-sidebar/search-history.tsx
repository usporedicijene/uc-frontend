"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { deleteSearchHistoryItemAction } from "@/features/app-sidebar/actions";
import type { SearchHistoryItem } from "@/lib/cookies/search-history";
import { formatTimestamp } from "@/lib/utils";

interface SearchHistoryProps {
  items: SearchHistoryItem[];
}

export function SearchHistory({ items }: SearchHistoryProps) {
  const t = useTranslations("SearchHistory");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const currentSearchQuery = searchParams.get("value");

  function handleDelete(index: number) {
    startTransition(async () => {
      await deleteSearchHistoryItemAction(index);
    });
  }

  return items.map((item, index) => {
    const isActive = currentSearchQuery === item.query;

    return (
      <SidebarMenuSubItem
        className="group/item mx-0 flex items-center gap-1"
        key={`${item.query}-${index}`}
      >
        <SidebarMenuSubButton
          asChild
          className={`group flex-1 ${isActive ? "text-sidebar-accent-foreground !hover:text-sidebar-accent-foreground !bg-transparent" : "text-muted-foreground !hover:text-muted-foreground"}`}
          title={`${t("searchAgain")}: ${item.query}`}
        >
          <Link
            className="flex min-w-0 flex-1 items-center justify-between gap-2"
            href={{ pathname: "/", query: { value: item.query } }}
          >
            <span className="truncate text-sm">{item.query}</span>
            <span className="shrink-0 text-xs opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              {formatTimestamp(item.timestamp, t)}
            </span>
          </Link>
        </SidebarMenuSubButton>
        <button
          className="hover:text-foreground text-muted-foreground shrink-0 cursor-pointer rounded-md p-1 opacity-0 transition-all group-hover/item:opacity-100"
          disabled={isPending}
          title={t("delete")}
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleDelete(index);
          }}
        >
          <X className="size-4" />
        </button>
      </SidebarMenuSubItem>
    );
  });
}
