"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { toApiError } from "@/shared/lib/apiClient";
import { useActivateCenter } from "../../hooks/useActivateCenter";
import type { CenterStatus } from "../../api/centers.types";
import { useDeactivateCenters } from "../../hooks/useDecactivateCenters";

type Props = {
  centerId: string;
  status: CenterStatus;
  hasBankAccount: boolean;
};

export function CenterActivateButton({ centerId, status, hasBankAccount }: Props) {
  const activate = useActivateCenter(centerId);
  const deactivate = useDeactivateCenters(centerId)

  const isActive = status === "ACTIVE";
  const disabled =  !hasBankAccount || activate.isPending || deactivate.isPending;
  

  const label = deactivate.isPending ? "Deactivating" : activate.isPending ? "Activating" : isActive ? "Deactivate" : "Activate"

  

    const handleClickActivate = () => {
      if (isActive) {
        deactivate.mutate()
        return
      }
      activate.mutate()
      return
    }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        variant="accent"
        size="md"
        disabled={disabled}
        onClick={handleClickActivate}
      >
        {label}
      </Button>

      {!hasBankAccount && !isActive ? (
        <p className="text-xs text-white/70 max-w-xs text-right">
          Add bank settlement details before activating.
        </p>
      ) : null}

      {activate.isError ? (
        <p className="text-xs text-accent-300 flex items-center gap-1 max-w-xs text-right">
          <AlertCircle size={12} />
          {toApiError(activate.error).message}
        </p>
      ) : activate.isSuccess && isActive ? (
        <p className="text-xs text-accent-300 flex items-center gap-1">
          <CheckCircle2 size={12} />
          Center activated
        </p>
      ) : null}
    </div>
  );
}
