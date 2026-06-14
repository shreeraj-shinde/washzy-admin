import { Center } from "@/features/centers";

export type PayoutStatus = "SETTLED" | "PROCESSING" | "FAILED";

export type Payout = {
  id: string;
  txnNumber: string;
  centerId: string;
  amount: number;
  remarks?: string;
  referenceNumber?: string;
  failureReason?: string;
  idempotencyKey: string;
  status: PayoutStatus;
  center: Partial<Center>;
  settledAt?: string;
  createdAt: string;
};

export type SendPayoutPayload = {
  centerId: string;
  amount: number;
  remarks?: string;
  idempotencyKey: string;
};

export type CenterTransactionType = "CREDIT" | "DEBIT";

export type CenterTransaction = {
  id: string;
  type: CenterTransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  bookingId?: string;
  payoutId?: string;
  description?: string;
  createdAt: string;
  booking?: {
    jobNumber: number;
    serviceTier: string;
    scheduledAt: string;
    amount: number;
  } | null;
};

export type CenterWallet = {
  pendingBalance: number;
  totalEarned: number;
  totalPaidOut: number;
};

export type CenterPayoutSummary = {
  wallet: CenterWallet;
  bankAccount: {
    accountHolderName: string;
    accountNumberMasked: string;
    ifscCode: string;
  } | null;
  transactions: {
    items: CenterTransaction[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  };
  payouts: {
    items: Payout[];
    total: number;
  };
};
