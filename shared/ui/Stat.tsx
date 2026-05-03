import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  iconBg?: string;
  iconColor?: string;
  className?: string;
};

export function Stat({
  icon,
  label,
  value,
  iconBg = "bg-teal-50",
  iconColor = "text-teal-900",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-card bg-white shadow-card px-5 py-4 flex items-center gap-4",
        className,
      )}
    >
      <span
        className={cn(
          "h-11 w-11 rounded-xl flex items-center justify-center",
          iconBg,
          iconColor,
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-navy-900 leading-tight">
          {value}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}
