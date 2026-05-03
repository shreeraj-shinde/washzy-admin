"use client";

import { ChevronRight, Download, Filter, Building2 } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { usePayouts } from "../hooks/usePayouts";
import { PayoutStatusBadge } from "./PayoutStatusBadge";
import type { Payout } from "../api/payouts.types";

export function PayoutHistoryList() {
  const { data, isLoading, isError } = usePayouts();

  return (
    <Card className="p-6 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navy-900">Payout History</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Download size={14} /> Export CSV
          </Button>
          <button
            type="button"
            aria-label="Filter"
            className="h-9 w-9 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted"
          >
            <Filter size={16} />
          </button>
        </div>
      </header>

      <ul className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="h-16 rounded-2xl bg-surface-muted animate-pulse"
              />
            ))
          : isError
            ? null
            : (data?.items ?? []).map((p) => (
                <PayoutRow key={p.id} payout={p} />
              ))}
      </ul>

      <button
        type="button"
        className="text-xs uppercase tracking-wider text-text-muted hover:text-navy-900 self-center mt-2"
      >
        Load Older Transactions
      </button>
    </Card>
  );
}

function PayoutRow({ payout }: { payout: Payout }) {
  return (
    <li className="rounded-2xl px-4 py-3 hover:bg-surface-muted flex items-center gap-4">
      <span className="h-10 w-10 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center">
        <Building2 size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy-900 truncate">
          {payout.center.name}
        </p>
        <p className="text-xs text-text-muted truncate">
          ID: {payout.txnNumber} ·{" "}
          {new Date(payout.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-navy-900">
          ₹ {payout.amount.toLocaleString("en-IN")}
        </span>
        <PayoutStatusBadge status={payout.status} />
      </div>
      <ChevronRight size={16} className="text-text-muted" />
    </li>
  );
}
