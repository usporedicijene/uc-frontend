export interface StoreLocation {
  store_id: string;
  type: string | null;
  address: string | null;
  city: string | null;
  zipcode: string | null;
  client: string;
  latitude: number | null;
  longitude: number | null;
}

export interface GetAllLocationsResponse {
  total_locations: number;
  locations: StoreLocation[];
}
