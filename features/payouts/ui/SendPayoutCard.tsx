"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Wallet, Building2 } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Select } from "@/shared/ui/Select";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";
import { useCentersList } from "@/features/centers";
import { useSendPayout, useCenterWallet } from "../hooks/usePayouts";
import { useState } from "react";
import { generateUID } from "@/shared/lib/utils";

const schema = z.object({
  centerId: z.string().min(1, "Select a center"),
  amount: z.number().positive("Enter an amount"),
  remarks: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function SendPayoutCard() {
  const { data: centers } = useCentersList();
  const send = useSendPayout();
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const { data: walletData, isLoading: walletLoading } = useCenterWallet(selectedCenterId);

  const { register, handleSubmit, reset, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { centerId: "", remarks: "" },
  });

  const [idempotencyKey, setIdempotencyKey] = useState(() => generateUID());

  const submit = handleSubmit(async (values) => {
    await send.mutateAsync({ ...values, idempotencyKey });
    reset();
    setSelectedCenterId(null);
    setIdempotencyKey(generateUID());
  });

  const pendingBalance = walletData?.wallet.pendingBalance ?? 0;
  const bankAccount = walletData?.bankAccount;

  return (
    <Card className="p-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navy-900">Send New Payout</h2>
        <span className="h-9 w-9 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center">
          <Wallet size={16} />
        </span>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field label="Service Center" error={formState.errors.centerId?.message}>
          <Select
            {...register("centerId")}
            onChange={(e) => {
              register("centerId").onChange(e);
              setSelectedCenterId(e.target.value || null);
            }}
          >
            <option value="">Select a destination center</option>
            {centers?.items.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </Field>

        {/* Center wallet info — shown once a center is selected */}
        {selectedCenterId && (
          <div className="rounded-2xl bg-surface-muted px-4 py-3 flex flex-col gap-2">
            {walletLoading ? (
              <div className="h-10 animate-pulse rounded-xl bg-border" />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Pending Balance</span>
                  <span className="text-sm font-semibold text-navy-900">
                    ₹{Number(pendingBalance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {bankAccount ? (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Building2 size={12} />
                    <span>{bankAccount.accountHolderName} · {bankAccount.accountNumberMasked} · {bankAccount.ifscCode}</span>
                  </div>
                ) : (
                  <p className="text-xs text-danger">No bank account on file</p>
                )}
                {pendingBalance > 0 && (
                  <button
                    type="button"
                    className="text-xs text-teal-600 hover:underline self-start"
                    onClick={() => setValue("amount", Number(pendingBalance), { shouldValidate: true })}
                  >
                    Use full balance
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <Field label="Amount (Rupees)" error={formState.errors.amount?.message}>
          <Input
            type="number"
            step="any"
            inputMode="decimal"
            placeholder="₹ 0.00"
            {...register("amount", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Transfer Remarks">
          <Textarea
            rows={3}
            placeholder="Monthly commission settlement…"
            {...register("remarks")}
          />
        </Field>

        <Button
          type="submit"
          variant="primary"
          disabled={send.isPending || !bankAccount}
          className="mt-2"
        >
          <Send size={14} />
          {send.isPending ? "Initiating…" : "Initiate Payout"}
        </Button>
      </form>
    </Card>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-navy-900">{label}</span>
      {children}
      {error ? <p className="text-xs text-danger px-2">{error}</p> : null}
    </div>
  );
}
