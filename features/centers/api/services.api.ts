import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess } from "@/shared/types/api";
import type { Service } from "./centers.types";

/**
 * Layer: API
 * Service catalog (Bike Wash, Standard Wash, ...). Sorted by sortOrder.
 */
export async function listServices(): Promise<Service[]> {
  const res = await apiClient.get<ApiSuccess<Service[]>>("/services");
  return res.data.data;
}
