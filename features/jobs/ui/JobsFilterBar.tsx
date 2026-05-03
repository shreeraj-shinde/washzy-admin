"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useJobsFilters } from "../state/jobs.store";
import type { JobStatus } from "../api/jobs.types";

const TABS: { key: JobStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "All Jobs" },
  { key: "PENDING", label: "Pending" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
];

export function JobsFilterBar() {
  const { status, setStatus } = useJobsFilters();

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        {TABS.map((t) => {
          const active = status === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setStatus(t.key)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
                active
                  ? "bg-navy-900 text-white"
                  : "bg-surface-muted text-text-muted hover:text-navy-900",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-navy-900"
      >
        <SlidersHorizontal size={14} />
        More Filters
      </button>
    </div>
  );
}
