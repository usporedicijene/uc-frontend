import { fetchApi } from "@/fetchApi";

import type { GetCitiesResponse } from "./types/city";

export async function getCities(): Promise<GetCitiesResponse> {
  return await fetchApi("/get-cities");
}
