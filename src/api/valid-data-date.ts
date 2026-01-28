import { fetchApi } from "@/fetchApi";

interface ValidDataDateResponse {
  valid_data_date: string;
}

export async function getValidDataDate(): Promise<ValidDataDateResponse> {
  return await fetchApi("/valid-data-date");
}
