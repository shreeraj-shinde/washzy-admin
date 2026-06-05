import type { Metadata } from "next";
import Link from "next/link";
import { DeleteAccountForm } from "./DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete Account — Washzy",
  description:
    "Submit a request to permanently delete your Washzy account and all associated data.",
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 text-white">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100 hover:text-white transition-colors"
          >
            ← Back to Washzy
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            Delete Account
          </h1>
          <p className="mt-4 text-base md:text-lg text-navy-50/85 leading-relaxed">
            You can permanently delete your Washzy account and all associated
            data by filling out the form below.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <div className="rounded-xl border border-danger/30 bg-danger/5 px-5 py-4 mb-8">
          <p className="text-sm font-semibold text-danger mb-1">
            This action is permanent
          </p>
          <ul className="text-sm text-text-strong flex flex-col gap-1 list-disc list-inside">
            <li>Your account, booking history, and profile data will be erased.</li>
            <li>Any remaining wallet balance will be forfeited.</li>
            <li>You will need to create a new account to use Washzy again.</li>
          </ul>
        </div>

        <section className="rounded-card bg-white shadow-card p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 mb-1">
            Account Deletion Request
          </p>
          <h2 className="text-2xl font-semibold text-navy-900 tracking-tight mb-6">
            Fill in your details
          </h2>
          <DeleteAccountForm />
        </section>
      </div>
    </main>
  );
}
