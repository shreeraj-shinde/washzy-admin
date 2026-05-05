import type { ReactNode } from "react";

type Props = {
  label: string;
  icon?: ReactNode;
  accessory?: ReactNode;
  children: ReactNode;
};

export function Field({ label, icon, accessory, children }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-muted">
          {icon ? <span className="text-teal-900">{icon}</span> : null}
          {label}
        </div>
        {accessory}
      </div>
      {children}
    </div>
  );
}
