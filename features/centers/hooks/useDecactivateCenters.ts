"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateCeneter } from "../api/centers.api";

export function useDeactivateCenters(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deactivateCeneter(id),
    onSuccess: (center) => {
      qc.setQueryData(["centers", id], center);
      qc.invalidateQueries({ queryKey: ["centers"] });
    },
  });
}
