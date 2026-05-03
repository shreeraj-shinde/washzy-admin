import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-full bg-border py-[18px] pl-5 pr-12 text-base text-navy-900",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white",
          invalid && "ring-2 ring-danger",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
      />
    </div>
  );
});
