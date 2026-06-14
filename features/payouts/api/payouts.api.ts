import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Payout, SendPayoutPayload, CenterPayoutSummary } from "./payouts.types";

export async function listPayouts(): Promise<Paginated<Payout>> {
  const res = await apiClient.get<ApiSuccess<Paginated<Payout>>>("/admin/payouts");
  return res.data.data;
}

export async function sendPayout(payload: SendPayoutPayload): Promise<Payout> {
  const res = await apiClient.post<ApiSuccess<Payout>>("/admin/payouts", payload);
  return res.data.data;
}

export async function settlePayout(id: string, referenceNumber?: string): Promise<Payout> {
  const res = await apiClient.patch<ApiSuccess<Payout>>(`/admin/payouts/${id}/settle`, { referenceNumber });
  return res.data.data;
}

export async function failPayout(id: string, failureReason: string): Promise<Payout> {
  const res = await apiClient.patch<ApiSuccess<Payout>>(`/admin/payouts/${id}/fail`, { failureReason });
  return res.data.data;
}

export async function getPayoutSummary(): Promise<{
  totalDisbursedThisMonth: number;
  percentChangeVsLastMonth: number | null;
}> {
  const res = await apiClient.get<ApiSuccess<{ totalDisbursedThisMonth: number; percentChangeVsLastMonth: number | null }>>(
    "/admin/payouts/summary",
  );
  return res.data.data;
}

export async function getCenterWallet(centerId: string, page = 1, limit = 20): Promise<CenterPayoutSummary> {
  const res = await apiClient.get<ApiSuccess<CenterPayoutSummary>>(
    `/admin/centers/${centerId}/wallet`,
    { params: { page, limit } },
  );
  return res.data.data;
}
