"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Wallet } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Select } from "@/shared/ui/Select";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";
import { useCentersList } from "@/features/centers";
import { useSendPayout } from "../hooks/usePayouts";
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
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { centerId: "", remarks: "" },
  });

  const [idempotencyKey, setidempotencyKey] = useState(() => generateUID());

  const submit = handleSubmit(async (values) => {
    await send.mutateAsync({ ...values, idempotencyKey });
    reset();
  });

  return (
    <Card className="p-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navy-900">Send New Payout</h2>
        <span className="h-9 w-9 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center">
          <Wallet size={16} />
        </span>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field
          label="Service Center"
          error={formState.errors.centerId?.message}
        >
          <Select {...register("centerId")}>
            <option value="">Select a destination center</option>
            {centers?.items.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>

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
          disabled={send.isPending}
          className="mt-2"
        >
          <Send size={14} />
          {send.isPending ? "Initiating…" : "Initiate Payout"}
        </Button>
      </form>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-navy-900">{label}</span>
      {children}
      {error ? <p className="text-xs text-danger px-2">{error}</p> : null}
    </div>
  );
}
