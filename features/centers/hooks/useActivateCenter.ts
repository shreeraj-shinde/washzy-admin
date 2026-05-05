"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCenter } from "../api/centers.api";

export function useActivateCenter(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => activateCenter(id),
    onSuccess: (center) => {
      qc.setQueryData(["centers", id], center);
      qc.invalidateQueries({ queryKey: ["centers"] });
    },
  });
}
