"use client";

import { create } from "zustand";
import type { PayoutStatus } from "../api/payouts.types";

type FilterState = {
  statusFilter: PayoutStatus | "ALL";
  setStatusFilter: (s: PayoutStatus | "ALL") => void;
};

export const usePayoutsFilter = create<FilterState>((set) => ({
  statusFilter: "ALL",
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));
