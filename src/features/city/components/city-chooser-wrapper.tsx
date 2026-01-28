import { getCities } from "@/api/city";
import { getCityIdCookie } from "@/lib/cookies/city";

import { CityChooser } from "./city-chooser";

export async function CityChooserWrapper() {
  const [cityId, { cities }] = await Promise.all([
    getCityIdCookie(),
    getCities(),
  ]);

  return <CityChooser cities={cities} initialCityId={cityId} />;
}
