"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listPayouts, sendPayout, settlePayout, failPayout, getPayoutSummary, getCenterWallet } from "../api/payouts.api";
import type { SendPayoutPayload } from "../api/payouts.types";

export function usePayouts() {
  return useQuery({ queryKey: ["payouts"], queryFn: listPayouts });
}

export function usePayoutSummary() {
  return useQuery({ queryKey: ["payouts", "summary"], queryFn: getPayoutSummary });
}

export function useCenterWallet(centerId: string | null, page = 1) {
  return useQuery({
    queryKey: ["center-wallet", centerId, page],
    queryFn: () => getCenterWallet(centerId!, page),
    enabled: Boolean(centerId),
  });
}

export function useSendPayout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendPayoutPayload) => sendPayout(payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["payouts"] });
      qc.invalidateQueries({ queryKey: ["center-wallet", variables.centerId] });
    },
  });
}

export function useSettlePayout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, referenceNumber }: { id: string; referenceNumber?: string }) =>
      settlePayout(id, referenceNumber),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}

export function useFailPayout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, failureReason }: { id: string; failureReason: string }) =>
      failPayout(id, failureReason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}
