import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Payout, SendPayoutPayload } from "./payouts.types";

export async function listPayouts(): Promise<Paginated<Payout>> {
  const res = await apiClient.get<ApiSuccess<Paginated<Payout>>>(
    "/admin/payouts",
  );
  return res.data.data;
}

export async function sendPayout(payload: SendPayoutPayload): Promise<Payout> {
  const res = await apiClient.post<ApiSuccess<Payout>>(
    "/admin/payouts",
    payload,
  );
  return res.data.data;
}

export async function getPayoutSummary(): Promise<{
  totalThisMonthInr: number;
  changePctVsLastMonth: number;
}> {
  const res = await apiClient.get<
    ApiSuccess<{ totalThisMonthInr: number; changePctVsLastMonth: number }>
  >("/admin/payouts/summary");
  return res.data.data;
}
