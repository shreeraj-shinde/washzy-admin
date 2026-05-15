import { Badge } from "@/shared/ui/Badge";
import { TierBadge } from "../StatusBadge";
import { CenterActivateButton } from "./CenterActivateButton";
import { CenterDeleteButton } from "./CenterDeleteButton";
import type { Center, CenterStatus } from "../../api/centers.types";

const STATUS_TONE: Record<CenterStatus, Parameters<typeof Badge>[0]["tone"]> = {
  DRAFT: "muted",
  INACTIVE: "mercury",
  ACTIVE: "success",
};

type Props = { center: Center };

export function CenterDetailHeader({ center }: Props) {
  return (
    <div className="bg-navy-900 text-white px-8 py-6 flex items-start justify-between gap-6 flex-wrap">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <TierBadge tier={center.tier} />
          <Badge tone={STATUS_TONE[center.status]}>{center.status}</Badge>
          {!center.isActive ? <Badge tone="muted">SUSPENDED</Badge> : null}
        </div>
        <h1 className="text-2xl font-semibold">{center.name}</h1>
        <p className="text-xs text-white/60">
          ID: <span className="font-mono">{center.id}</span>
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <CenterActivateButton
          centerId={center.id}
          status={center.status}
          hasBankAccount={Boolean(center.bankAccount)}
        />
        {center.status === "INACTIVE" ? (
          <CenterDeleteButton centerId={center.id} centerName={center.name} />
        ) : null}
      </div>
    </div>
  );
}
