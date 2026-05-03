import { MapPin, Phone, Banknote } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { TierBadge } from "./StatusBadge";
import { OtpVerifiedBadge } from "./OtpVerifiedBadge";
import type { Center } from "../api/centers.types";

type Props = { center: Center };

export function CenterCard({ center }: Props) {
  return (
    <Card>
      <div className="bg-navy-900 text-white px-6 py-5 flex flex-col gap-2">
        <TierBadge tier={center.tier} />
        <h3 className="text-lg font-semibold">{center.name}</h3>
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        <Field
          icon={<Phone size={14} />}
          label="Primary Contact"
          accessory={center.isOtpVerified ? <OtpVerifiedBadge /> : null}
        >
          <p className="text-sm font-medium text-navy-900">{center.phone}</p>
        </Field>

        <Field icon={<MapPin size={14} />} label="Physical Address">
          <p className="text-sm text-navy-900 leading-relaxed">
            {center.address}
          </p>
          <p className="mt-2 text-xs text-text-muted">
            LAT {center.latitude}° N · LNG {center.longitude}° E
          </p>
        </Field>

        {center.bankAccount ? (
          <div className="bg-teal-50/60 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-teal-900 mb-2">
              <Banknote size={12} />
              Bank Settlement Details
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <Detail
                label="Holder Name"
                value={center.bankAccount.accountHolderName}
              />
              <Detail label="IFSC Code" value={center.bankAccount.ifscCode} />
              <Detail
                label="Account Number"
                value={center.bankAccount.accountNumber}
                className="col-span-2"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function Field({
  icon,
  label,
  accessory,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  accessory?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-muted">
          <span className="text-teal-900">{icon}</span>
          {label}
        </div>
        {accessory}
      </div>
      {children}
    </div>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <p className="text-sm text-navy-900 font-medium">{value}</p>
    </div>
  );
}
