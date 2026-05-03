"use client";

import { Check, Droplets, Sparkles, Crown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useCreateCenterStore } from "../state/createCenter.store";
import type { ServiceTierKey } from "../api/createCenter";

type TierMeta = {
  key: ServiceTierKey;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  selectedClass: string;
};

const TIERS: TierMeta[] = [
  {
    key: "STANDARD_WASH",
    title: "Standard Wash",
    blurb: "Essential cleaning for daily commuters.",
    icon: <Droplets size={18} />,
    selectedClass: "border-teal-500 bg-teal-50/40",
  },
  {
    key: "PREMIUM_DETAIL",
    title: "Premium Detail",
    blurb: "Full interior & clay bar exterior.",
    icon: <Sparkles size={18} />,
    selectedClass: "border-navy-900 bg-navy-50/40",
  },
  {
    key: "PRESIDENTIAL_LUXE",
    title: "Presidential Luxe",
    blurb: "Ceramic coating & deep leather care.",
    icon: <Crown size={18} />,
    selectedClass: "border-accent-500 bg-accent-300/20",
  },
];

export function ServiceTierGrid() {
  const selected = useCreateCenterStore((s) => s.selectedTiers);
  const toggle = useCreateCenterStore((s) => s.toggleTier);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {TIERS.map((t) => {
        const isOn = selected.includes(t.key);
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => toggle(t.key)}
            className={cn(
              "text-left p-4 rounded-2xl border transition-colors relative",
              isOn
                ? t.selectedClass
                : "border-border bg-surface-muted hover:bg-white",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-teal-900">{t.icon}</span>
              {isOn ? (
                <span className="h-5 w-5 rounded-full bg-teal-900 text-white flex items-center justify-center">
                  <Check size={12} />
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-navy-900">
              {t.title}
            </h3>
            <p className="mt-1 text-xs text-text-muted leading-snug">
              {t.blurb}
            </p>
          </button>
        );
      })}
    </div>
  );
}
