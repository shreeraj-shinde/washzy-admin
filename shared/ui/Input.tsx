import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  leadingIcon?: ReactNode;
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, leadingIcon, invalid, ...rest },
  ref,
) {
  return (
    <div className="relative w-full">
      {leadingIcon ? (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          {leadingIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        className={cn(
          "w-full rounded-full bg-border py-[18px] pr-4 text-base text-navy-900 placeholder:text-text-muted",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white",
          leadingIcon ? "pl-12" : "pl-5",
          invalid && "ring-2 ring-danger",
          className,
        )}
        {...rest}
      />
    </div>
  );
});
