"use client";

import { useQuery } from "@tanstack/react-query";
import { listCenters, getCenter } from "../api/centers.api";
import { useCentersFilters } from "../state/centers.store";

/**
 * Layer: Hook
 * Bridges API + State for UI. Returns view-model shaped data only.
 */

export function useCentersList() {
  const { search, status } = useCentersFilters();
  return useQuery({
    queryKey: ["centers", { search, status }],
    queryFn: () =>
      listCenters({
        search: search || undefined,
        status: status === "ALL" ? undefined : status,
      }),
  });
}

export function useCenter(id: string) {
  return useQuery({
    queryKey: ["centers", id],
    queryFn: () => getCenter(id),
    enabled: Boolean(id),
  });
}
