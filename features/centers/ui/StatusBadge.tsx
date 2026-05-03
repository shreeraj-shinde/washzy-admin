import { Badge } from "@/shared/ui/Badge";
import type { CenterTier } from "../api/centers.types";

const TONE_BY_TIER: Record<CenterTier, Parameters<typeof Badge>[0]["tone"]> = {
  STANDARD: "mercury",
  ACTIVE: "teal",
  PREMIUM: "accent",
};

export function TierBadge({ tier }: { tier: CenterTier }) {
  return <Badge tone={TONE_BY_TIER[tier]}>{tier}</Badge>;
}
