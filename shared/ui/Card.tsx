import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: Props) {
  return (
    <div
      className={cn("rounded-card bg-white shadow-card", className)}
      {...rest}
    />
  );
}
