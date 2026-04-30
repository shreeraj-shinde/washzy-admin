"use client";

import { create } from "zustand";
import type { JobStatus } from "../api/jobs.types";

type JobsFilterState = {
  status: JobStatus | "ALL";
  range: "7d" | "30d" | "90d";
  page: number;
  setStatus: (s: JobStatus | "ALL") => void;
  setRange: (r: "7d" | "30d" | "90d") => void;
  setPage: (p: number) => void;
};

export const useJobsFilters = create<JobsFilterState>((set) => ({
  status: "ALL",
  range: "30d",
  page: 1,
  setStatus: (status) => set({ status, page: 1 }),
  setRange: (range) => set({ range, page: 1 }),
  setPage: (page) => set({ page }),
}));
