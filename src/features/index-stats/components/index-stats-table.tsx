"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndexStatsView } from "@/features/index-stats/types";
import { capitalize } from "@/lib/utils";

function getColor(change: number): string {
  if (change < 0) return "#34d399"; // emerald-400 (drop)
  if (change < 2) return "#a3a3a3"; // gray-400 (minimal)
  if (change < 5) return "#fb923c"; // orange-400
  if (change < 10) return "#f87171"; // red-400
  return "#991b1b"; // red-800
}

interface CityData {
  name: string;
  average_change: number;
  count: number;
}

interface IndexStatsTableProps {
  data: CityData[];
  /**
   * Indicates the current view context (per_city, per_market, per_category).
   * This is currently not used inside the component, but it enables callers
   * to pass the prop without TypeScript errors and leaves room for future
   * conditional rendering based on the selected view.
   */
  view?: IndexStatsView;
}

export function IndexStatsTable({ data }: IndexStatsTableProps) {
  const t = useTranslations("IndexStatsTable");

  const [search, setSearch] = useState("");

  // Set default sorting to average_change in descending order as requested
  const [sortKey, setSortKey] = useState<keyof CityData | null>(
    "average_change",
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filteredData = useMemo(() => {
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter((city) => city.name.toLowerCase().includes(term));
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal, "hr-HR");
      }
      return (aVal as number) - (bVal as number);
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortKey, sortDir]);

  const handleSort = (key: keyof CityData) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <Card className="flex h-full w-full flex-col gap-4 py-5 shadow-sm">
      <CardContent className="flex min-h-0 flex-1 flex-col">
        {/* Fixed Header */}
        <div className="w-full flex-shrink-0 overflow-x-auto">
          <div className="mb-3 w-full">
            <Input
              placeholder={t("searchName")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold">
                  <div
                    className="group flex cursor-pointer items-center"
                    role="button"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1 border-b border-transparent text-sm group-hover:border-white">
                      {t("name")}
                      {sortKey === "name" ? (
                        sortDir === "asc" ? (
                          <ArrowUp
                            className={clsx(
                              "ml-1 h-4 w-4",
                              sortKey === "name" && "text-primary",
                            )}
                          />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </div>
                </TableHead>
                <TableHead className="group text-right font-bold">
                  <div
                    className="flex w-full cursor-pointer items-center justify-end"
                    role="button"
                    onClick={() => handleSort("average_change")}
                  >
                    <div className="flex flex-row-reverse items-center gap-1 border-b border-transparent text-sm group-hover:border-white">
                      {t("averageChange")}
                      {sortKey === "average_change" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </TableHead>
                <TableHead className="text-right font-bold">
                  <div
                    className="group flex w-full cursor-pointer items-center justify-end"
                    role="button"
                    onClick={() => handleSort("count")}
                  >
                    <div className="flex flex-row-reverse items-center gap-1 border-b border-transparent text-sm group-hover:border-white">
                      {t("sampleCount")}
                      {sortKey === "count" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        {/* Scrollable Body */}
        <div className="min-h-0 flex-1 overflow-auto pr-4">
          <Table className="table-auto">
            <TableBody>
              {sortedData.map((city, idx) => (
                <TableRow
                  className={
                    idx % 2 === 0
                      ? "hover:bg-muted/60"
                      : "bg-muted/20 hover:bg-muted/60"
                  }
                  key={city.name}
                >
                  <TableCell className="text-foreground">
                    {capitalize(city.name)}
                  </TableCell>
                  <TableCell className="text-end">
                    <Badge
                      className="text-sm font-semibold text-white"
                      style={{ backgroundColor: getColor(city.average_change) }}
                    >
                      {city.average_change > 0 ? "+" : ""}
                      {city.average_change.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {city.count.toLocaleString("hr-HR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
