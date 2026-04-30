"use client";

import { create } from "zustand";
import type { CenterStatus } from "../api/centers.types";

/**
 * Layer: State
 * Client-only filter state. Server data lives in TanStack Query cache.
 */

type CentersFilterState = {
  search: string;
  status: CenterStatus | "ALL";
  setSearch: (s: string) => void;
  setStatus: (s: CenterStatus | "ALL") => void;
};

export const useCentersFilters = create<CentersFilterState>((set) => ({
  search: "",
  status: "ALL",
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
}));
