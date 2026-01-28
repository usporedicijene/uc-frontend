import { HistoryIcon, Search } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getSearchHistoryCookie } from "@/lib/cookies/search-history";
import { formatTimestamp } from "@/lib/utils";

export async function SearchHistoryDropdown() {
  const [tDropdown, history] = await Promise.all([
    getTranslations("SearchHistory"),
    getSearchHistoryCookie(),
  ]);

  return (
    <DropdownMenuContent
      align="start"
      className="max-h-96 w-72 overflow-y-auto"
      side="right"
    >
      <DropdownMenuLabel>{tDropdown("title")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {history.length === 0 ? (
        <DropdownMenuItem disabled inset>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <HistoryIcon className="text-muted-foreground mb-2 size-8" />
            <p className="text-muted-foreground text-sm">
              {tDropdown("empty")}
            </p>
          </div>
        </DropdownMenuItem>
      ) : (
        history.map((item, index) => (
          <DropdownMenuItem
            asChild
            className="min-w-0"
            key={`${item.query}-${index}`}
          >
            <Link
              className="flex w-full cursor-pointer items-center justify-between gap-3"
              href={{ pathname: "/", query: { value: item.query } }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Search className="text-muted-foreground size-3 shrink-0" />
                <span className="truncate">{item.query}</span>
              </div>
              <span className="text-muted-foreground shrink-0 text-xs">
                {formatTimestamp(item.timestamp, tDropdown)}
              </span>
            </Link>
          </DropdownMenuItem>
        ))
      )}
    </DropdownMenuContent>
  );
}
