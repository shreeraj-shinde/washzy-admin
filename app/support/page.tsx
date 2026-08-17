import type { Metadata } from "next";
import Link from "next/link";
import { SupportForm } from "./SupportForm";

const CONTACT_EMAIL = "washzy@washzyservice.com";

export const metadata: Metadata = {
  title: "Support — Washzy",
  description:
    "Have an issue or a question about Washzy? Send us a message and our support team will get back to you.",
};

export default function SupportPage() {
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
            Support
          </h1>
          <p className="mt-4 text-base md:text-lg text-navy-50/85 leading-relaxed">
            Running into an issue or have a question? Fill out the form below
            and our support team will get back to you.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <section className="rounded-card bg-white shadow-card p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 mb-1">
            Contact Support
          </p>
          <h2 className="text-2xl font-semibold text-navy-900 tracking-tight mb-6">
            How can we help?
          </h2>
          <SupportForm />
        </section>

        <p className="mt-6 text-center text-sm text-text-muted">
          You can also reach us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}
