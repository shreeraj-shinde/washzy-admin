"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listPayouts, sendPayout, getPayoutSummary } from "../api/payouts.api";
import type { SendPayoutPayload } from "../api/payouts.types";

export function usePayouts() {
  return useQuery({ queryKey: ["payouts"], queryFn: listPayouts });
}

export function usePayoutSummary() {
  return useQuery({
    queryKey: ["payouts", "summary"],
    queryFn: getPayoutSummary,
  });
}

export function useSendPayout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendPayoutPayload) => sendPayout(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}
