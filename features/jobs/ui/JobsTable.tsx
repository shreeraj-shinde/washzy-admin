"use client";

import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { cn } from "@/shared/lib/cn";
import { useJobs } from "../hooks/useJobs";
import { useJobsFilters } from "../state/jobs.store";
import { JobsFilterBar } from "./JobsFilterBar";
import { JobStatusPill } from "./JobStatusPill";
import type { Job } from "../api/jobs.types";

const COLS = [
  "Center & ID",
  "Customer",
  "Vehicle Details",
  "Service & Date",
  "Amount",
  "Status",
  "",
] as const;

export function JobsTable() {
  const { data, isLoading, isError } = useJobs();
  const { page, setPage } = useJobsFilters();

  return (
    <Card className="p-6 flex flex-col gap-4">
      <JobsFilterBar />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {COLS.map((col) => (
                <th
                  key={col}
                  className="text-left px-3 py-3 text-[10px] uppercase tracking-wider text-text-muted font-medium"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : isError ? (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="px-3 py-8 text-center text-danger"
                >
                  Failed to load jobs.
                </td>
              </tr>
            ) : (data?.items ?? []).length === 0 ? (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="px-3 py-8 text-center text-text-muted"
                >
                  No jobs match the current filters.
                </td>
              </tr>
            ) : (
              data!.items.map((job) => <JobRow key={job.id} job={job} />)
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={data?.pageSize ?? 4}
        total={data?.total ?? 0}
        onChange={setPage}
      />
    </Card>
  );
}

function JobRow({ job }: { job: Job }) {
  return (
    <tr className="border-b border-border/60 last:border-0 hover:bg-surface-muted/40">
      <td className="px-3 py-4 align-top">
        <p className="font-medium text-navy-900">{job.centerName}</p>
        <p className="text-xs text-text-muted">#{job.jobRef}</p>
      </td>
      <td className="px-3 py-4 align-top">
        <div className="flex items-center gap-2">
          <Avatar name={job.customerName} src={job.customerAvatar} size={28} />
          <span className="text-navy-900">{job.customerName}</span>
        </div>
      </td>
      <td className="px-3 py-4 align-top">
        <p className="text-navy-900">
          {job.vehicleBrand} {job.vehicleModel}
        </p>
        <span className="mt-1 inline-block text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-surface-subtle text-text-muted">
          {job.plateNumber}
        </span>
      </td>
      <td className="px-3 py-4 align-top">
        <p className="text-navy-900">{job.serviceName}</p>
        <p className="text-xs text-teal-900">
          {new Date(job.scheduledAt).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </td>
      <td className="px-3 py-4 align-top text-navy-900 font-medium">
        ₹{job.amountInr.toLocaleString("en-IN")}
      </td>
      <td className="px-3 py-4 align-top">
        <JobStatusPill status={job.status} />
      </td>
      <td className="px-3 py-4 align-top text-text-muted">
        <button
          type="button"
          aria-label="Row actions"
          className="hover:text-navy-900"
        >
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-border/60 last:border-0">
          {COLS.map((_c, j) => (
            <td key={j} className="px-3 py-4">
              <div className="h-4 w-24 rounded bg-surface-subtle animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between text-xs text-text-muted pt-2">
      <span>
        Showing <span className="text-navy-900 font-medium">{start}</span> -{" "}
        <span className="text-navy-900 font-medium">{end}</span> of{" "}
        <span className="text-navy-900 font-medium">
          {total.toLocaleString("en-IN")}
        </span>{" "}
        jobs
      </span>
      <div className="flex items-center gap-1">
        <PageBtn
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          ariaLabel="Previous page"
        >
          <ChevronLeft size={14} />
        </PageBtn>
        {pageNumbers(page, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="px-2">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={cn(
                "h-8 min-w-8 px-2 rounded-full text-xs font-medium",
                p === page
                  ? "bg-navy-900 text-white"
                  : "text-text-muted hover:bg-surface-muted",
              )}
            >
              {p}
            </button>
          ),
        )}
        <PageBtn
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          ariaLabel="Next page"
        >
          <ChevronRight size={14} />
        </PageBtn>
      </div>
    </div>
  );
}

function PageBtn({
  children,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="h-8 w-8 rounded-full hover:bg-surface-muted text-text-muted disabled:opacity-30 flex items-center justify-center"
    >
      {children}
    </button>
  );
}

function pageNumbers(current: number, total: number): Array<number | "…"> {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "…"> = [1];
  if (current > 3) pages.push("…");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  ) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
