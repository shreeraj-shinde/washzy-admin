"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createCenter,
  uploadCenterImage,
  type CenterDraftPayload,
  type SaveMode,
} from "../api/createCenter";

export function useCreateCenter() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      mode,
    }: {
      payload: CenterDraftPayload;
      mode: SaveMode;
    }) => createCenter(payload, mode),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["centers"] });
      router.push("/centers");
    },
  });
}

export function useUploadCenterImage() {
  return useMutation({ mutationFn: (file: File) => uploadCenterImage(file) });
}
