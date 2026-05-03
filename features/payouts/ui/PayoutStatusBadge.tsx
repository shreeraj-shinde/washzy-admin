import { cn } from "@/shared/lib/cn";
import type { PayoutStatus } from "../api/payouts.types";

const STYLES: Record<PayoutStatus, string> = {
  SETTLED: "bg-teal-500",
  PROCESSING: "bg-accent-500",
  FAILED: "bg-danger",
};

const LABEL: Record<PayoutStatus, string> = {
  SETTLED: "Settled",
  PROCESSING: "Processing",
  FAILED: "Failed",
};

export function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-navy-900">
      <span className={cn("h-1.5 w-1.5 rounded-full", STYLES[status])} />
      {LABEL[status]}
    </span>
  );
}
