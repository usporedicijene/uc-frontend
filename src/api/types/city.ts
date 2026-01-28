export interface City {
  id: string;
  name: string;
}

export interface GetCitiesResponse {
  cities: City[];
  total: number;
}
