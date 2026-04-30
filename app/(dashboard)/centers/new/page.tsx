import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CreateCenterForm } from "@/features/centers/ui/CreateCenterForm";

export default function CreateCenterPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <header className="flex flex-col gap-3">
        <nav className="flex items-center gap-1 text-sm text-text-muted">
          <Link href="/centers" className="hover:text-navy-900">
            Centers
          </Link>
          <ChevronRight size={14} />
          <span className="text-navy-900">Onboarding</span>
        </nav>
        <h1 className="text-3xl font-semibold text-navy-900">
          New Center Registration
        </h1>
        <p className="text-sm text-text-muted max-w-2xl">
          Expansion protocols for high-end automotive care facilities. Enter
          precise details to initialize the concierge service.
        </p>
      </header>
      <CreateCenterForm />
    </div>
  );
}
