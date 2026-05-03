import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        accent:
          "bg-accent-500 text-accent-text shadow-[0_4px_7px_rgba(241,193,9,0.39)] hover:bg-accent-300 focus-visible:ring-accent-500",
        primary:
          "bg-navy-900 text-white hover:bg-navy-700 focus-visible:ring-navy-900",
        ghost:
          "bg-transparent text-navy-900 hover:bg-navy-50 focus-visible:ring-navy-500",
        outline:
          "border border-divider bg-white text-navy-900 hover:bg-surface-muted focus-visible:ring-navy-500",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-12 px-6 text-base rounded-full",
        lg: "h-14 px-8 text-lg rounded-full w-full",
      },
    },
    defaultVariants: { variant: "accent", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, size, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...rest}
    />
  );
});
