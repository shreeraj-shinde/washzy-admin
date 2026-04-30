"use client";

import { Calendar, Download } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { useJobsSummary } from "../hooks/useJobs";

export function JobsHeader() {
  const { data } = useJobsSummary();
  const activeHubs = data?.uniqueCustomers ? Math.round(data.uniqueCustomers / 37) : 0;

  return (
    <header className="flex items-start justify-between gap-6 flex-wrap">
      <div>
        <h1 className="text-3xl font-semibold text-navy-900">Job History</h1>
        <p className="mt-2 text-sm text-text-muted">
          Monitoring cleanliness across{" "}
          <span className="text-teal-900 font-medium">
            {activeHubs} active hubs
          </span>{" "}
          globally.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost">
          <Calendar size={14} /> Last 30 Days
        </Button>
        <Button size="sm" variant="primary">
          <Download size={14} /> Export Report
        </Button>
      </div>
    </header>
  );
}
