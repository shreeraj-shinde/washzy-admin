"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteCenter } from "../api/centers.api";

export function useDeleteCenter(id: string) {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => deleteCenter(id),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["centers", id] });
      qc.invalidateQueries({ queryKey: ["centers"] });
      router.push("/centers");
    },
  });
}
