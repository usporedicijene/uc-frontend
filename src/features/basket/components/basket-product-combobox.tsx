"use client";

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { BasketItemRequest } from "@/api/types/basket";
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
import { cn } from "@/lib/utils";

import { persistItemsAction, searchProductsAction } from "../actions";

interface ProductComboboxProps {
  items?: BasketItemRequest[];
}

export function BasketProductCombobox({ items }: ProductComboboxProps) {
  const t = useTranslations("BasketProductCombobox");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    { barcode: string; name: string; brand: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.length < 3) {
          setResults([]);
          setIsLoading(false);
          return;
        }
        try {
          setIsLoading(true);
          const data = await searchProductsAction(value);
          setResults(data);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearch(search.trim());
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  async function toggleProduct(barcode: string, name: string, brand: string) {
    if (!items) {
      return;
    }

    const exists = items?.some((item) => item.barcode === barcode);
    const next = exists
      ? items?.filter((item) => item.barcode !== barcode)
      : [...(items || []), { barcode, quantity: 1, name, brand }];

    await persistItemsAction(next);

    if (exists) {
      toast(t("removed"));
    } else {
      toast(t("added"));
    }
  }

  const triggerLabel = items?.length
    ? t("triggerCount", { count: items.length })
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
              isLoading={isLoading}
              placeholder={t("searchPlaceholder")}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              <CommandGroup>
                {results.map((product) => {
                  const { barcode, brand, name } = product;

                  const isSelected = items?.some(
                    (item) => item.barcode === barcode,
                  );

                  return (
                    <CommandItem
                      key={barcode}
                      value={`${brand || ""} ${name}`}
                      onSelect={() => toggleProduct(barcode, name, brand)}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {name}
                        </div>
                        <div className="text-muted-foreground truncate text-xs">
                          {barcode}
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
