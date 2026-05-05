import { Banknote } from "lucide-react";
import { Detail } from "./Detail";
import type { BankAccount } from "../../api/centers.types";

type Props = { bankAccount?: BankAccount };

export function CenterBankCard({ bankAccount }: Props) {
  if (!bankAccount) {
    return (
      <div className="mx-8 mb-8 bg-surface-subtle rounded-xl px-5 py-4 text-xs text-text-muted">
        No bank account on file. The center cannot be activated until settlement
        details are added.
      </div>
    );
  }

  return (
    <div className="mx-8 mb-8 bg-teal-50/60 rounded-xl px-5 py-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-teal-900 mb-3">
        <Banknote size={12} />
        Bank Settlement Details
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        <Detail label="Holder Name" value={bankAccount.accountHolderName} />
        <Detail label="IFSC Code" value={bankAccount.ifscCode} />
        <Detail
          label="Account Number"
          value={bankAccount.accountNumber}
          className="col-span-2"
        />
      </div>
    </div>
  );
}
