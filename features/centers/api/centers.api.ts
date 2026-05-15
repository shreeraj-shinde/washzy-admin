import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Center, CenterListQuery } from "./centers.types";

/**
 * Layer: API
 * Pure HTTP. No React, no caching, no UI concerns.
 */

// List Centers
export async function listCenters(
  query: CenterListQuery = {},
): Promise<Paginated<Center>> {
  const res = await apiClient.get<ApiSuccess<Paginated<Center>>>(
    "/admin/centers",
    { params: query },
  );
  return res.data.data;
}

// GEt Center - Returns a Center for a specified id
export async function getCenter(id: string): Promise<Center> {
  const res = await apiClient.get<ApiSuccess<Center>>(`/admin/centers/${id}`);

  return res.data.data;
}


// Activate Center - Activates the Center 
export async function activateCenter(id: string): Promise<Center> {
  const res = await apiClient.patch<ApiSuccess<Center>>(
    `/admin/centers/${id}/activate`,
  );
  return res.data.data;
}

// Deactivate Center - Deactivates the Center
export async function deactivateCeneter(id : string) : Promise<Center>  {
  const res = await apiClient.patch<ApiSuccess<Center>>(
    `/admin/centers/${id}/deactivate`
  )
  return res.data.data
}

// Delete Centers 

export async function deleteCenter(id : string) {
  const res = await apiClient.delete(`/admin/centers/${id}`)
  return res.data
}