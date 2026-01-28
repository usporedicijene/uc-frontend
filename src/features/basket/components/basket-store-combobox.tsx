"use client";

import { useMemo, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { StoreLocation } from "@/api/types/locations";
import { MarketLogo } from "@/components/market-logo";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/sonner";
import { capitalize, cn } from "@/lib/utils";

import { persistLocationsAction } from "../actions";

interface StoreComboboxProps {
  locations: StoreLocation[];
  selectedLocations?: StoreLocation[];
}

export function BasketStoreCombobox({
  locations,
  selectedLocations,
}: StoreComboboxProps) {
  const t = useTranslations("BasketStoreCombobox");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLocations: StoreLocation[] = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return locations.slice(0, 100);

    const searchTerms = query.split(/\s+/).filter(Boolean);

    const base = locations.filter((location) => {
      const searchableString = [
        location.client,
        location.city,
        location.address,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableString.includes(term));
    });

    return base.slice(0, 100);
  }, [locations, search]);

  async function toggleStore(location: StoreLocation) {
    if (!selectedLocations) {
      return;
    }

    const { client, store_id } = location;

    const exists = selectedLocations.some(
      (store) => store.client === client && store.store_id === store_id,
    );
    const next = exists
      ? selectedLocations.filter(
          (store) => !(store.client === client && store.store_id === store_id),
        )
      : [...selectedLocations, location];

    await persistLocationsAction(next);

    if (exists) {
      toast(t("removed"));
    } else {
      toast(t("added"));
    }
  }

  const triggerLabel = selectedLocations?.length
    ? t("triggerCount", { count: selectedLocations.length })
    : t("triggerEmpty");

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-full justify-between"
            role="combobox"
            size="default"
            variant="outline"
          >
            {triggerLabel}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="bg-background ring-border/60 w-[560px] max-w-[calc(100vw-2rem)] p-0 shadow-xl ring-1"
          sideOffset={8}
        >
          <Command className="bg-background">
            <CommandInput
              placeholder={t("searchPlaceholder")}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              <CommandGroup>
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLocations?.some(
                    (store) =>
                      store.client === loc.client &&
                      store.store_id === loc.store_id,
                  );
                  return (
                    <CommandItem
                      key={`${loc.client}-${loc.store_id}`}
                      value={`${loc.client} ${loc.city || ""} ${loc.address || ""}`}
                      onSelect={() => toggleStore(loc)}
                    >
                      <MarketLogo marketName={loc.client} size="xs" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {capitalize(loc.client)}
                        </div>
                        <div className="text-muted-foreground truncate text-xs">
                          {loc.city} {loc.address ? `• ${loc.address}` : ""}
                        </div>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto size-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
