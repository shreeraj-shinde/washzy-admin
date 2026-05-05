"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { toApiError } from "@/shared/lib/apiClient";
import { useCenter } from "../hooks/useCenters";
import { CenterDetailHeader } from "./center-detail/CenterDetailHeader";
import { CenterInfoGrid } from "./center-detail/CenterInfoGrid";
import { CenterBankCard } from "./center-detail/CenterBankCard";
import { CenterPhotosGallery } from "./center-detail/CenterPhotosGallery";
import { CenterDetailSkeleton } from "./center-detail/CenterDetailSkeleton";

type Props = { id: string };

export function CenterDetail({ id }: Props) {
  const { data: center, isLoading, isError, error } = useCenter(id);

  if (isLoading) return <CenterDetailSkeleton />;

  if (isError || !center) {
    return (
      <Card className="p-8 text-center text-danger">
        Failed to load center. {toApiError(error).message}
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/centers"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-navy-900 w-fit"
      >
        <ArrowLeft size={14} />
        Back to centers
      </Link>

      <Card className="overflow-hidden">
        <CenterDetailHeader center={center} />
        <CenterInfoGrid center={center} />
        <CenterBankCard bankAccount={center.bankAccount} />
      </Card>

      <CenterPhotosGallery images={center.images ?? []} />
    </div>
  );
}
