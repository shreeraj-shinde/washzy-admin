export type CenterTier = "STANDARD" | "ACTIVE" | "PREMIUM";
export type CenterStatus = "DRAFT" | "INACTIVE" | "ACTIVE";

enum ServiceTier {
  STANDARD_WASH = "STANDARD_WASH",
  PREMIUM_DETAIL = "PREMIUM_DETAIL",
  PRESIDENTIAL_LUXE = "PRESIDENTIAL_LUXE",
}

export type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
};

export type Center = {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  tier: CenterTier;
  status: CenterStatus;
  isOtpVerified: Boolean;
  serviceTiers: ServiceTier[];
  isActive: Boolean;
  bankAccount: BankAccount;
  createdAt: string;
  updatedAt: string;
};



export type CenterListQuery = {
  page?: number;
  pageSize?: number;
  status?: CenterStatus;
  search?: string;
};
