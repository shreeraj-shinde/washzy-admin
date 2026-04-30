import { cn } from "@/shared/lib/cn";
import type { JobStatus } from "../api/jobs.types";

const STYLES: Record<JobStatus, string> = {
  PENDING: "bg-surface-subtle text-text-muted",
  IN_PROGRESS: "bg-accent-300/30 text-accent-text",
  COMPLETED: "bg-teal-100 text-teal-900",
  CANCELLED: "bg-red-100 text-danger",
};

const LABEL: Record<JobStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function JobStatusPill({ status }: { status: JobStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full",
        STYLES[status],
      )}
    >
      {LABEL[status]}
    </span>
  );
}
