import { cn } from "@/shared/lib/cn";

type Props = {
  label: string;
  value: string;
  className?: string;
};

export function Detail({ label, value, className }: Props) {
  return (
    <div className={cn(className)}>
      <p className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <p className="text-sm text-navy-900 font-medium">{value}</p>
    </div>
  );
}
