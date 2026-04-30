export type JobStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type Job = {
  id: string;
  jobRef: string;
  centerName: string;
  customerName: string;
  customerAvatar?: string | null;
  vehicleBrand: string;
  vehicleModel: string;
  plateNumber: string;
  serviceName: string;
  scheduledAt: string;
  amountInr: number;
  status: JobStatus;
};

export type JobsSummary = {
  totalWashes: number;
  revenueTodayInr: number;
  uniqueCustomers: number;
  avgRating: number;
};

export type JobListQuery = {
  status?: JobStatus | "ALL";
  range?: "7d" | "30d" | "90d";
  page?: number;
};
