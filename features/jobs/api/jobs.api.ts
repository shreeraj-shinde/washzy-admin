import { apiClient } from "@/shared/lib/apiClient";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Job, JobListQuery, JobsSummary } from "./jobs.types";

export async function listJobs(
  query: JobListQuery = {},
): Promise<Paginated<Job>> {
  const res = await apiClient.get<ApiSuccess<Paginated<Job>>>("/admin/jobs", {
    params: {
      ...query,
      status: query.status === "ALL" ? undefined : query.status,
    },
  });

  console.log("JOBS", res.data.data);
  return res.data.data;
}

export async function getJobsSummary(): Promise<JobsSummary> {
  const res = await apiClient.get<ApiSuccess<JobsSummary>>("/admin/jobs");

  
  return res.data.data;
}
