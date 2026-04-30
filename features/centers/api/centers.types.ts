export type CenterTier = "STANDARD" | "ACTIVE" | "PREMIUM";
export type CenterStatus = "DRAFT" | "INACTIVE" | "ACTIVE";

export type SettlementAccount = {
  accountHolderName: string;
  /** Backend returns the masked form (last-4 only). */
  accountNumberMasked: string;
  ifscCode: string;
};

export type Center = {
  id: string;
  centerName: string;
  status: CenterStatus;
  tier: CenterTier;
  phone: string;
  isPhoneVerified: boolean;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  settlement?: SettlementAccount;
  createdAt: string;
  updatedAt: string;
};

export type CenterListQuery = {
  page?: number;
  pageSize?: number;
  status?: CenterStatus;
  search?: string;
};
