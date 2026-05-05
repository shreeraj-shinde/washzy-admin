"use client";

import { useParams } from "next/navigation";
import { CenterDetail } from "@/features/centers/ui/CenterDetail";

export default function CenterDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) return null;

  return <CenterDetail id={id} />;
}
