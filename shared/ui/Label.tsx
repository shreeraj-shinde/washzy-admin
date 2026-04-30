import type { LabelHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...rest }: Props) {
  return (
    <label
      className={cn("text-sm leading-5 text-teal-900 font-normal", className)}
      {...rest}
    />
  );
}
