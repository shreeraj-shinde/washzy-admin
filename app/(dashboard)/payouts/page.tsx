import {
  SendPayoutCard,
  MonthlyDisbursedCard,
  PayoutHistoryList,
} from "@/features/payouts";

export default function PayoutsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      <header>
        <p className="text-xs uppercase tracking-wider text-teal-900">
          Financial Ledger
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">
          Payout Management
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <SendPayoutCard />
          <MonthlyDisbursedCard />
        </div>
        <PayoutHistoryList />
      </div>
    </div>
  );
}
