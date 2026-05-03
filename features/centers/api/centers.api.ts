import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Center, CenterListQuery } from "./centers.types";

/**
 * Layer: API
 * Pure HTTP. No React, no caching, no UI concerns.
 */

export async function listCenters(
  query: CenterListQuery = {},
): Promise<Paginated<Center>> {
  const res = await apiClient.get<ApiSuccess<Paginated<Center>>>(
    "/admin/centers",
    { params: query },
  );
  return res.data.data;
}

export async function getCenter(id: string): Promise<Center> {
  const res = await apiClient.get<ApiSuccess<Center>>(`/admin/centers/${id}`);

  return res.data.data;
}
