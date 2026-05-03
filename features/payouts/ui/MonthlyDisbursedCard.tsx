"use client";

import { TrendingUp } from "lucide-react";
import { usePayoutSummary } from "../hooks/usePayouts";

export function MonthlyDisbursedCard() {
  const { data } = usePayoutSummary();
  const total = data?.totalThisMonthInr ?? 0;
  const change = data?.changePctVsLastMonth ?? 0;

  return (
    <div className="rounded-card bg-navy-900 text-white px-6 py-5 flex flex-col gap-2 shadow-card">
      <span className="text-xs text-white/70">Total Disbursed This Month</span>
      <span className="text-3xl font-semibold">
        ₹ {total.toLocaleString("en-IN")}
      </span>
      <span className="flex items-center gap-1 text-xs text-teal-100">
        <TrendingUp size={12} />
        {change > 0 ? "+" : ""}
        {change}% vs last month
      </span>
    </div>
  );
}
