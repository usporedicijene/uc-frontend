import { getAllLocations } from "@/api/locations";
import { basketFAQs, FAQSchema } from "@/components/structured-data/faq-schema";
import { Separator } from "@/components/ui/separator";
import { BasketSelectedItems } from "@/features/basket/components/basket-selected-items";
import { BasketSelectedStores } from "@/features/basket/components/basket-selected-stores";
import { BasketSubmitButton } from "@/features/basket/components/basket-submit-button";
import {
  getBasketItemsCookie,
  getBasketLocationsCookie,
} from "@/lib/cookies/basket";

import { BasketPageMetadata } from "./metadata";

export const metadata = BasketPageMetadata;

export default async function BasketPage() {
  const [locations, selectedLocations, items] = await Promise.all([
    getAllLocations(),
    getBasketLocationsCookie(),
    getBasketItemsCookie(),
  ]);

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-auto lg:grid-cols-2">
        <div className="h-full min-h-0">
          <BasketSelectedStores
            locations={locations.locations}
            selectedLocations={selectedLocations}
          />
        </div>
        <div className="h-full min-h-0">
          <BasketSelectedItems items={items} />
        </div>
      </div>
      <Separator className="hidden md:block" />
      <div className="shrink-0">
        <BasketSubmitButton
          itemsCount={items.length}
          storesCount={selectedLocations.length}
        />
      </div>
      <FAQSchema faqs={basketFAQs} />
    </>
  );
}
