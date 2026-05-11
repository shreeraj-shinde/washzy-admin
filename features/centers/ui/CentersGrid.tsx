"use client";

import Link from "next/link";
import { useCentersList } from "../hooks/useCenters";
import { CenterCard } from "./CenterCard";
import { OnboardCenterCard } from "./OnboardCenterCard";

export function CentersGrid() {
  const { data, isLoading, isError, error } = useCentersList();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[420px] rounded-card bg-white/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-card bg-white p-10 text-center">
        <p className="text-danger font-medium">Failed to load centers</p>
        <p className="text-sm text-text-muted mt-1">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  const centers = data?.items ?? [];

  console.log(centers);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {centers.map((c) => (
        <Link
          key={c.id}
          href={`/centers/${c.id}`}
          aria-label={`Open ${c.name}`}
          className="rounded-card outline-none transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          <CenterCard center={c} />
        </Link>
      ))}
      <OnboardCenterCard />
    </div>
  );
}
