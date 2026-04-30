export type PayoutStatus = "SETTLED" | "PROCESSING" | "FAILED";

export type Payout = {
  id: string;
  centerId: string;
  centerName: string;
  amountInr: number;
  status: PayoutStatus;
  txnRef: string;
  createdAt: string;
  remarks?: string;
};

export type SendPayoutPayload = {
  centerId: string;
  amountInr: number;
  remarks?: string;
};
