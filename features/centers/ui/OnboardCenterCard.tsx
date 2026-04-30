import Link from "next/link";
import { Plus } from "lucide-react";

export function OnboardCenterCard() {
  return (
    <Link
      href="/centers/new"
      className="rounded-card border-2 border-dashed border-border bg-white/40 hover:bg-white/70 hover:border-teal-500 transition-colors p-8 flex flex-col items-center justify-center gap-3 min-h-[300px] text-center"
    >
      <span className="h-12 w-12 rounded-full bg-teal-50 text-teal-900 flex items-center justify-center">
        <Plus size={20} />
      </span>
      <h3 className="text-lg font-semibold text-navy-900">Onboard New Center</h3>
      <p className="text-sm text-text-muted max-w-[220px]">
        Initialise a new Hydro-Concierge service point to our network.
      </p>
    </Link>
  );
}
