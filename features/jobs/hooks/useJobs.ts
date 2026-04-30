"use client";

import { useQuery } from "@tanstack/react-query";
import { listJobs, getJobsSummary } from "../api/jobs.api";
import { useJobsFilters } from "../state/jobs.store";

export function useJobs() {
  const { status, range, page } = useJobsFilters();
  return useQuery({
    queryKey: ["jobs", { status, range, page }],
    queryFn: () => listJobs({ status, range, page }),
  });
}

export function useJobsSummary() {
  return useQuery({
    queryKey: ["jobs", "summary"],
    queryFn: getJobsSummary,
  });
}
