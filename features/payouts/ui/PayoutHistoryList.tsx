"use client";

import { useState } from "react";
import { Download, Building2, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { usePayouts, useSettlePayout, useFailPayout } from "../hooks/usePayouts";
import { PayoutStatusBadge } from "./PayoutStatusBadge";
import type { Payout } from "../api/payouts.types";
import { downloadCsv, type CsvColumn } from "@/shared/lib/exportCsv";

const PAYOUT_CSV_COLUMNS: CsvColumn<Payout>[] = [
  { header: "Txn Number",     value: (p) => p.txnNumber },
  { header: "Payout ID",      value: (p) => p.id },
  { header: "Center",         value: (p) => p.center?.name ?? "" },
  { header: "Amount (INR)",   value: (p) => p.amount },
  { header: "Status",         value: (p) => p.status },
  { header: "Reference",      value: (p) => p.referenceNumber ?? "" },
  { header: "Failure Reason", value: (p) => p.failureReason ?? "" },
  { header: "Remarks",        value: (p) => p.remarks ?? "" },
  { header: "Created At",     value: (p) => new Date(p.createdAt).toISOString() },
  { header: "Settled At",     value: (p) => p.settledAt ? new Date(p.settledAt).toISOString() : "" },
];

export function PayoutHistoryList() {
  const { data, isLoading, isError } = usePayouts();
  const payouts = data?.items ?? [];

  const handleExportCsv = () => {
    if (payouts.length === 0) return;
    downloadCsv(`payouts-${new Date().toISOString().slice(0, 10)}.csv`, payouts, PAYOUT_CSV_COLUMNS);
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navy-900">Payout History</h2>
        <Button size="sm" variant="ghost" onClick={handleExportCsv} disabled={isLoading || isError || payouts.length === 0}>
          <Download size={14} /> Export CSV
        </Button>
      </header>

      <ul className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="h-16 rounded-2xl bg-surface-muted animate-pulse" />
            ))
          : isError
            ? <li className="text-sm text-danger text-center py-4">Failed to load payouts</li>
            : payouts.length === 0
              ? <li className="text-sm text-text-muted text-center py-8">No payouts yet</li>
              : payouts.map((p) => <PayoutRow key={p.id} payout={p} />)}
      </ul>
    </Card>
  );
}

function PayoutRow({ payout }: { payout: Payout }) {
  const settle = useSettlePayout();
  const fail   = useFailPayout();

  const [settleModal, setSettleModal] = useState(false);
  const [failModal, setFailModal]     = useState(false);
  const [ref, setRef]                 = useState("");
  const [reason, setReason]           = useState("");

  const handleSettle = async () => {
    await settle.mutateAsync({ id: payout.id, referenceNumber: ref.trim() || undefined });
    setSettleModal(false);
    setRef("");
  };

  const handleFail = async () => {
    if (!reason.trim()) return;
    await fail.mutateAsync({ id: payout.id, failureReason: reason.trim() });
    setFailModal(false);
    setReason("");
  };

  return (
    <>
      <li className="rounded-2xl px-4 py-3 hover:bg-surface-muted flex items-center gap-4">
        <span className="h-10 w-10 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0">
          <Building2 size={16} />
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-navy-900 truncate">{payout.center.name}</p>
          <p className="text-xs text-text-muted truncate">
            {payout.txnNumber} · {new Date(payout.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          {payout.referenceNumber && (
            <p className="text-xs text-text-muted">Ref: {payout.referenceNumber}</p>
          )}
          {payout.failureReason && (
            <p className="text-xs text-danger">{payout.failureReason}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="text-sm font-semibold text-navy-900">
            ₹{Number(payout.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <PayoutStatusBadge status={payout.status} />
        </div>

        {payout.status === "PROCESSING" && (
          <div className="flex flex-col gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setSettleModal(true)}
              className="flex items-center gap-1 text-xs text-teal-600 hover:underline"
            >
              <CheckCircle size={12} /> Settle
            </button>
            <button
              type="button"
              onClick={() => setFailModal(true)}
              className="flex items-center gap-1 text-xs text-danger hover:underline"
            >
              <XCircle size={12} /> Fail
            </button>
          </div>
        )}
      </li>

      {/* Settle modal */}
      {settleModal && (
        <Modal
          title="Mark as Settled"
          description={`Confirm you have transferred ₹${Number(payout.amount).toLocaleString("en-IN")} to ${payout.center.name}.`}
          onClose={() => setSettleModal(false)}
        >
          <Input
            placeholder="UTR / Reference number (optional)"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
          <div className="flex gap-3 mt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setSettleModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" className="flex-1" disabled={settle.isPending} onClick={handleSettle}>
              {settle.isPending ? "Saving…" : "Confirm Settled"}
            </Button>
          </div>
        </Modal>
      )}

      {/* Fail modal */}
      {failModal && (
        <Modal
          title="Mark as Failed"
          description="The center's pending balance will be restored automatically."
          onClose={() => setFailModal(false)}
        >
          <Input
            placeholder="Failure reason (required)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex gap-3 mt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setFailModal(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-danger text-white hover:bg-danger/90"
              disabled={fail.isPending || !reason.trim()}
              onClick={handleFail}
            >
              {fail.isPending ? "Saving…" : "Confirm Failed"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ title, description, onClose, children }: {
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-card shadow-card w-full max-w-sm p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-navy-900">{title}</h3>
          <p className="text-sm text-text-muted mt-1">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
