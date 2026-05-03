import { ShieldCheck } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

export function OtpVerifiedBadge() {
  return (
    <Badge tone="teal" className="gap-1.5">
      <ShieldCheck size={10} />
      OTP Verified
    </Badge>
  );
}
