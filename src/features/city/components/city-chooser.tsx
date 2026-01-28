"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { ChevronsUpDown, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { City } from "@/api/types/city";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { setCityAction } from "@/features/city/actions";
import { useMediaQuery } from "@/hooks/use-media-query";

import { CityChooserList } from "./city-chooser-list";

interface CityChooserProps {
  initialCityId?: string;
  cities: City[];
  onIsPendingChange?: (isPending: boolean) => void;
}

function CityChooser({
  cities,
  initialCityId,
  onIsPendingChange,
}: CityChooserProps) {
  const t = useTranslations("CityChooser");
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [selectedCityId, setSelectedCityId] = useOptimistic(initialCityId);

  useEffect(() => {
    onIsPendingChange?.(isPending);
  }, [isPending, onIsPendingChange]);

  function handleCitySelect(cityId: string) {
    if (cityId === selectedCityId) {
      return;
    }

    startTransition(() => {
      setSelectedCityId(cityId);
      setCityAction(cityId);
      router.refresh();
    });
  }

  const selectedCity = cities.find((city) => city.id === selectedCityId);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const triggerButton = (
    <Button
      aria-expanded={open}
      className="ml-2 flex h-8 items-center gap-2 overflow-hidden text-sm text-ellipsis whitespace-nowrap"
      role="combobox"
      size="sm"
      variant="outline"
    >
      {isPending ? (
        <Spinner size={16} />
      ) : (
        <>
          <MapPin className="size-4" />
          {selectedCity?.name || t("chooseSettlement")}
          <ChevronsUpDown className="ml-2 hidden h-4 w-4 shrink-0 opacity-50 md:flex" />
        </>
      )}
    </Button>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent className="w-64 p-0">
          <CityChooserList
            cities={cities}
            initialCityId={selectedCityId}
            setOpen={setOpen}
            onCitySelect={handleCitySelect}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer autoFocus={true} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="h-[40vh] max-h-96">
        <div className="mt-4 flex h-full flex-col overflow-hidden border-t">
          <CityChooserList
            cities={cities}
            initialCityId={selectedCityId}
            setOpen={setOpen}
            onCitySelect={handleCitySelect}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { CityChooser };
