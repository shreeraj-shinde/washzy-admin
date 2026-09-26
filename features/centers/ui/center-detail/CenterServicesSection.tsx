"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Pencil } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { toApiError } from "@/shared/lib/apiClient";
import { useUpdateCenterServices } from "../../hooks/useServices";
import { ServiceCatalogPicker } from "../ServiceChecklist";
import {
  SERVICE_DURATION_MIN,
  VEHICLE_LABEL,
  formatServicePrice,
} from "../../lib/serviceFormat";
import type { Center } from "../../api/centers.types";

type Props = { center: Center };

export function CenterServicesSection({ center }: Props) {
  const services = center.services ?? [];
  const update = useUpdateCenterServices(center.id);
  const [editing, setEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const currentIds = services.map((s) => s.id);
  const isDraft = center.status === "DRAFT";
  const unchanged =
    selectedIds.length === currentIds.length &&
    selectedIds.every((id) => currentIds.includes(id));
  // Backend rejects an empty set for any non-DRAFT center
  const emptyNotAllowed = !isDraft && selectedIds.length === 0;

  function startEdit() {
    setSelectedIds(currentIds);
    update.reset();
    setEditing(true);
  }

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function save() {
    update.mutate(selectedIds, { onSuccess: () => setEditing(false) });
  }

  return (
    <div className="mx-8 mb-6 rounded-xl border border-border px-5 py-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-[10px] uppercase tracking-wider text-text-muted">
          Services Offered
        </p>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={startEdit}>
            <Pencil size={14} />
            Edit services
          </Button>
        ) : null}
      </div>

      {editing ? (
        <div className="flex flex-col gap-3">
          <ServiceCatalogPicker
            selectedIds={selectedIds}
            onToggle={toggle}
            disabled={update.isPending}
          />

          {emptyNotAllowed ? (
            <p className="text-xs text-danger">
              Select at least one service — only draft centers can have none.
            </p>
          ) : null}

          {update.isError ? (
            <p className="text-xs text-danger flex items-center gap-1">
              <AlertCircle size={12} />
              {toApiError(update.error).message}
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(false)}
              disabled={update.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={save}
              disabled={update.isPending || unchanged || emptyNotAllowed}
            >
              {update.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      ) : services.length ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <Badge key={s.id} tone="teal">
                {s.name} · {formatServicePrice(s.price)} · {SERVICE_DURATION_MIN} min ·{" "}
                {VEHICLE_LABEL[s.vehicleCategory] ?? s.vehicleCategory}
              </Badge>
            ))}
          </div>
          {update.isSuccess ? (
            <p className="text-xs text-teal-700 flex items-center gap-1">
              <CheckCircle2 size={12} />
              Services updated
            </p>
          ) : null}
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
          <span>
            No services configured — customers can&apos;t book this station
            {isDraft ? "." : ", and it can't be activated until at least one service is selected."}
          </span>
        </div>
      )}
    </div>
  );
}
