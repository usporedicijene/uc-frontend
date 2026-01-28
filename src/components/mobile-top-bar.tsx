import { getCities } from "@/api/city";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { CityChooser } from "@/features/city/components/city-chooser";
import { getCityIdCookie } from "@/lib/cookies/city";

export async function MobileTopBar() {
  const [{ cities }, cityId] = await Promise.all([
    getCities(),
    getCityIdCookie(),
  ]);

  return (
    <div className="bg-background fixed top-0 z-40 w-full md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <MobileMenuButton />
        <CityChooser cities={cities} initialCityId={cityId} />
      </div>
    </div>
  );
}
