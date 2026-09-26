"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listServices } from "../api/services.api";
import { updateCenterServices } from "../api/centers.api";

export function useServiceCatalog() {
  return useQuery({
    queryKey: ["services"],
    queryFn: listServices,
    staleTime: 5 * 60_000,
  });
}

export function useUpdateCenterServices(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (serviceIds: string[]) => updateCenterServices(id, serviceIds),
    onSuccess: (center) => {
      qc.setQueryData(["centers", id], center);
      qc.invalidateQueries({ queryKey: ["centers"] });
    },
  });
}
