import { CentersGrid } from "@/features/centers";

export default function CentersPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold text-navy-900">Service Centers</h1>
        <p className="mt-2 text-sm text-text-muted max-w-2xl">
          Manage your premium hydro-concierge locations. Track settlements,
          verify contact details, and monitor geographic distribution.
        </p>
      </header>
      <CentersGrid />
    </div>
  );
}
