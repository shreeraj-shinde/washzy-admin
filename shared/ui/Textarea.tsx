import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl bg-border px-5 py-4 text-base text-navy-900 placeholder:text-text-muted resize-none",
        "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white",
        invalid && "ring-2 ring-danger",
        className,
      )}
      {...rest}
    />
  );
});
