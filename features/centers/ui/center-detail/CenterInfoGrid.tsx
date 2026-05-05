import { MapPin, Phone } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import { OtpVerifiedBadge } from "../OtpVerifiedBadge";
import { Field } from "./Field";
import type { Center } from "../../api/centers.types";

const SERVICE_TIER_LABEL: Record<string, string> = {
  STANDARD_WASH: "Standard Wash",
  PREMIUM_DETAIL: "Premium Detail",
  PRESIDENTIAL_LUXE: "Presidential Luxe",
};

const FORMAT_FULL: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const FORMAT_SHORT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
};

type Props = { center: Center };

export function CenterInfoGrid({ center }: Props) {
  return (
    <div className="px-8 py-6 grid gap-6 md:grid-cols-2">
      <Field
        icon={<Phone size={14} />}
        label="Primary Contact"
        accessory={center.isOtpVerified ? <OtpVerifiedBadge /> : null}
      >
        <p className="text-sm font-medium text-navy-900">{center.phone}</p>
      </Field>

      <Field icon={<MapPin size={14} />} label="Physical Address">
        <p className="text-sm text-navy-900 leading-relaxed">{center.address}</p>
        <p className="mt-1 text-xs text-text-muted">
          LAT {String(center.latitude)}° N · LNG {String(center.longitude)}° E
        </p>
      </Field>

      <Field label="Service Tiers">
        <div className="flex flex-wrap gap-2">
          {center.serviceTiers?.length ? (
            center.serviceTiers.map((t) => (
              <Badge key={String(t)} tone="teal">
                {SERVICE_TIER_LABEL[String(t)] ?? String(t)}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-text-muted">None configured</span>
          )}
        </div>
      </Field>

      <Field label="Created / Updated">
        <p className="text-sm text-navy-900">
          {new Date(center.createdAt).toLocaleString("en-IN", FORMAT_FULL)}
        </p>
        <p className="text-xs text-text-muted">
          Updated {new Date(center.updatedAt).toLocaleString("en-IN", FORMAT_SHORT)}
        </p>
      </Field>
    </div>
  );
}
