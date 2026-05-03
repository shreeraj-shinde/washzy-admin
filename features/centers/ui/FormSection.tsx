import type { ReactNode } from "react";
import { Card } from "@/shared/ui/Card";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export function FormSection({ title, description, children }: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      <div>
        <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      </div>
      <Card className="p-6">{children}</Card>
    </section>
  );
}

export function FormFieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-wider text-teal-900 font-medium">
      {children}
    </span>
  );
}
