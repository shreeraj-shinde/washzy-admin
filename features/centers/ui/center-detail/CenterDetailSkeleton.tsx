import { Card } from "@/shared/ui/Card";

export function CenterDetailSkeleton() {
  return (
    <Card className="p-8">
      <div className="h-6 w-48 bg-surface-subtle rounded animate-pulse mb-4" />
      <div className="h-4 w-72 bg-surface-subtle rounded animate-pulse mb-2" />
      <div className="h-4 w-64 bg-surface-subtle rounded animate-pulse" />
    </Card>
  );
}
