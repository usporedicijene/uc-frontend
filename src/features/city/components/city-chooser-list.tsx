"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { City } from "@/api/types/city";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface CityChooserListProps {
  cities: City[];
  initialCityId?: string;
  setOpen: (open: boolean) => void;
  onCitySelect: (cityId: string) => void;
}

function CityList({
  cities,
  initialCityId,
  onCitySelect,
  setOpen,
}: CityChooserListProps) {
  const t = useTranslations("CityChooser");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCityId && listRef.current) {
      const selectedCityElement = listRef.current?.querySelector(
        `[cmdk-item-id="${initialCityId}"]`,
      );
      if (selectedCityElement) {
        selectedCityElement.scrollIntoView({
          block: "start",
          behavior: "instant",
        });
      }
    }
  }, [initialCityId]);

  function handleSelect(cityId: string) {
    onCitySelect(cityId);
    setOpen(false);
  }

  return (
    <Command className="flex h-full flex-col">
      <CommandInput
        className="h-9 flex-shrink-0"
        placeholder={t("searchSettlementPlaceholder")}
      />
      <CommandList className="flex-1 overflow-auto" ref={listRef}>
        <CommandEmpty>{t("noSettlementsFound")}</CommandEmpty>
        <CommandGroup>
          {cities.map((city) => (
            <CommandItem
              cmdk-item-id={city.id}
              key={city.id}
              value={city.id}
              onSelect={() => handleSelect(city.id)}
            >
              <div className="flex flex-1 flex-row items-center justify-between gap-2">
                {city.name}
                <Check
                  className={cn(
                    "h-4 w-4",
                    initialCityId === city.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export { CityList as CityChooserList };
