"use client";

import { TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { useCenterWallet } from "@/features/payouts";
import type { CenterTransaction } from "@/features/payouts";

type Props = { centerId: string };

const SERVICE_TIER_LABEL: Record<string, string> = {
  STANDARD_WASH:      "Standard Wash",
  PREMIUM_DETAIL:     "Premium Detail",
  PRESIDENTIAL_LUXE:  "Presidential Luxe",
};

export function CenterEarningsCard({ centerId }: Props) {
  const { data, isLoading } = useCenterWallet(centerId);

  if (isLoading) {
    return (
      <Card className="p-6 flex flex-col gap-4">
        <div className="h-5 w-40 rounded-full bg-surface-muted animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-2xl bg-surface-muted animate-pulse" />)}
        </div>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => <div key={i} className="h-14 rounded-2xl bg-surface-muted animate-pulse" />)}
        </div>
      </Card>
    );
  }

  if (!data) return null;

  const { wallet, transactions } = data;
  const items = transactions.items;

  return (
    <Card className="p-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navy-900">Earnings</h2>
        <span className="h-9 w-9 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center">
          <TrendingUp size={16} />
        </span>
      </header>

      {/* Balance strip */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Pending Balance" value={wallet.pendingBalance} highlight />
        <StatBox label="Total Earned"    value={wallet.totalEarned} />
        <StatBox label="Total Paid Out"  value={wallet.totalPaidOut} />
      </div>

      {/* Transaction list */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xs uppercase tracking-wider text-text-muted mb-2">
          Transaction History
          {transactions.meta.total > 0 && (
            <span className="ml-2 text-navy-900 normal-case tracking-normal font-medium">
              ({transactions.meta.total} entries)
            </span>
          )}
        </h3>

        {items.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-6">No transactions yet</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {items.map((txn) => <TxnRow key={txn.id} txn={txn} />)}
          </ul>
        )}
      </div>
    </Card>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl px-4 py-3 flex flex-col gap-1 ${highlight ? "bg-teal-50" : "bg-surface-muted"}`}>
      <span className="text-xs text-text-muted">{label}</span>
      <span className={`text-base font-semibold ${highlight ? "text-teal-900" : "text-navy-900"}`}>
        ₹{Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}

function TxnRow({ txn }: { txn: CenterTransaction }) {
  const isCredit = txn.type === "CREDIT";
  return (
    <li className="rounded-2xl px-4 py-3 hover:bg-surface-muted flex items-center gap-3">
      <span className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${isCredit ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600"}`}>
        {isCredit ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy-900 truncate">
          {txn.booking
            ? `#${txn.booking.jobNumber} · ${SERVICE_TIER_LABEL[txn.booking.serviceTier] ?? txn.booking.serviceTier}`
            : txn.description ?? (isCredit ? "Credit" : "Payout")}
        </p>
        <p className="text-xs text-text-muted">
          {new Date(txn.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          {txn.booking?.scheduledAt && (
            <> · Washed {new Date(txn.booking.scheduledAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</>
          )}
        </p>
      </div>

      <span className={`text-sm font-semibold shrink-0 ${isCredit ? "text-teal-700" : "text-red-600"}`}>
        {isCredit ? "+" : "−"}₹{Number(txn.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </span>
    </li>
  );
}
