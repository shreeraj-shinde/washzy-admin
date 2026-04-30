import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess } from "@/shared/types/api";
import type { Center, CenterTier } from "./centers.types";

export type ServiceTierKey =
  | "STANDARD_WASH"
  | "PREMIUM_DETAIL"
  | "PRESIDENTIAL_LUXE";

export type CenterDraftPayload = {
  centerName: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  serviceTiers?: ServiceTierKey[];
  settlement?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
  tier?: CenterTier;
};

export type SaveMode = "draft" | "submit";

export async function createCenter(
  payload: CenterDraftPayload,
  mode: SaveMode,
): Promise<Center> {
  const res = await apiClient.post<ApiSuccess<Center>>("/admin/centers", {
    ...payload,
    saveMode: mode,
  });
  return res.data.data;
}

export async function uploadCenterImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiClient.post<ApiSuccess<{ url: string }>>(
    "/admin/centers/upload-image",
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data.data.url;
}
