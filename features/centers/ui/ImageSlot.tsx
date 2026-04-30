"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useUploadCenterImage } from "../hooks/useCreateCenter";
import {
  useCreateCenterStore,
  type ImageSlot as Slot,
} from "../state/createCenter.store";

type Props = { slot: Slot; label: string };

export function ImageSlot({ slot, label }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const url = useCreateCenterStore((s) => s.imageUrls[slot]);
  const setImage = useCreateCenterStore((s) => s.setImage);
  const upload = useUploadCenterImage();

  async function onPick(file: File) {
    const remoteUrl = await upload.mutateAsync(file);
    setImage(slot, remoteUrl);
  }

  return (
    <button
      type="button"
      onClick={() => input.current?.click()}
      className={cn(
        "relative aspect-square w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 transition-colors",
        url
          ? "bg-navy-900"
          : "bg-border hover:bg-surface-subtle text-teal-900",
      )}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <Camera size={20} />
          <span className="text-[10px] uppercase tracking-wider">{label}</span>
        </>
      )}
      {upload.isPending ? (
        <span className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center">
          Uploading…
        </span>
      ) : null}
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />
    </button>
  );
}
