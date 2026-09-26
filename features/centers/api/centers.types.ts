export type CenterTier = "STANDARD" | "ACTIVE" | "PREMIUM";
export type CenterStatus = "DRAFT" | "INACTIVE" | "ACTIVE";

export type VehicleCategory = "BIKE" | "CAR";

/** A catalog service (GET /services). Every service is one fixed 30-minute slot. */
export type Service = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  /** Prisma Decimal serialized as a string, e.g. "2000" */
  price: string;
  vehicleCategory: VehicleCategory;
  sortOrder: number;
};

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
  /** Active services this station offers. Empty means customers can't book it. */
  services: Service[];
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
