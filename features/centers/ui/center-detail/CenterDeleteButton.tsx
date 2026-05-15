"use client";

import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { toApiError } from "@/shared/lib/apiClient";
import { useDeleteCenter } from "../../hooks/useDeleteCenters";

type Props = { centerId: string; centerName: string };

export function CenterDeleteButton({ centerId, centerName }: Props) {
  const del = useDeleteCenter(centerId);
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex flex-col items-end gap-2">
        <p className="text-xs text-white/80 max-w-xs text-right">
          Delete <span className="font-semibold">{centerName}</span>? This archives the center and hides it from all views.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirming(false)}
            disabled={del.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="bg-danger hover:bg-danger/80 focus-visible:ring-danger"
            disabled={del.isPending}
            onClick={() => del.mutate()}
          >
            {del.isPending ? "Deleting…" : "Confirm delete"}
          </Button>
        </div>
        {del.isError ? (
          <p className="text-xs text-accent-300 flex items-center gap-1 max-w-xs text-right">
            <AlertCircle size={12} />
            {toApiError(del.error).message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setConfirming(true)}
      className="border-white/30 bg-transparent text-white hover:bg-white/10"
    >
      <Trash2 size={14} />
      Delete
    </Button>
  );
}
