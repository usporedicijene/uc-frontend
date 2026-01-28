import { fetchApi } from "@/fetchApi";

import type { GetAllLocationsResponse } from "./types/locations";

export async function getAllLocations(): Promise<GetAllLocationsResponse> {
  return await fetchApi("/all-locations");
}
