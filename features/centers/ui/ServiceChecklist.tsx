"use client";

import { AlertCircle, Bike, Car, Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { toApiError } from "@/shared/lib/apiClient";
import { useServiceCatalog } from "../hooks/useServices";
import {
  SERVICE_DURATION_MIN,
  VEHICLE_LABEL,
  formatServicePrice,
} from "../lib/serviceFormat";
import type { Service } from "../api/centers.types";

type ChecklistProps = {
  services: Service[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
};

/** Selectable service cards: "Bike Wash — ₹200 — 30 min" + Bike/Car label. */
export function ServiceChecklist({
  services,
  selectedIds,
  onToggle,
  disabled,
}: ChecklistProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {services.map((s) => {
        const isOn = selectedIds.includes(s.id);
        return (
          <button
            key={s.id}
            type="button"
            role="checkbox"
            aria-checked={isOn}
            disabled={disabled}
            onClick={() => onToggle(s.id)}
            className={cn(
              "text-left p-4 rounded-2xl border transition-colors relative disabled:opacity-60 disabled:cursor-not-allowed",
              isOn
                ? "border-teal-500 bg-teal-50/40"
                : "border-border bg-surface-muted hover:bg-white",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-900 border border-border">
                {s.vehicleCategory === "BIKE" ? <Bike size={12} /> : <Car size={12} />}
                {VEHICLE_LABEL[s.vehicleCategory] ?? s.vehicleCategory}
              </span>
              <span
                className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center border",
                  isOn
                    ? "bg-teal-900 border-teal-900 text-white"
                    : "bg-white border-border",
                )}
              >
                {isOn ? <Check size={12} /> : null}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-navy-900">{s.name}</h3>
            <p className="mt-1 text-xs text-text-muted">
              {formatServicePrice(s.price)} · {SERVICE_DURATION_MIN} min
            </p>
            {s.description ? (
              <p className="mt-1 text-xs text-text-muted leading-snug">
                {s.description}
              </p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

type PickerProps = Omit<ChecklistProps, "services">;

/** ServiceChecklist backed by the GET /services catalog, with loading/error states. */
export function ServiceCatalogPicker(props: PickerProps) {
  const catalog = useServiceCatalog();

  if (catalog.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-surface-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (catalog.isError) {
    return (
      <div className="flex items-start justify-between gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-danger" />
          <p className="text-xs text-danger">
            Couldn&apos;t load the service catalog. {toApiError(catalog.error).message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => catalog.refetch()}
          className="text-xs font-medium text-navy-900 underline shrink-0"
        >
          Retry
        </button>
      </div>
    );
  }

  const services = catalog.data ?? [];
  if (services.length === 0) {
    return (
      <p className="text-xs text-text-muted">
        No services are available in the catalog.
      </p>
    );
  }

  return <ServiceChecklist services={services} {...props} />;
}
