import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const badge = cva(
  "inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold uppercase tracking-[1px] rounded-full",
  {
    variants: {
      tone: {
        navy: "bg-navy-900 text-white",
        teal: "bg-teal-100 text-teal-900",
        accent: "bg-accent-500 text-accent-text",
        muted: "bg-surface-subtle text-text-muted",
        success: "bg-teal-100 text-teal-900",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

type Props = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ className, tone, ...rest }: Props) {
  return <span className={cn(badge({ tone }), className)} {...rest} />;
}
