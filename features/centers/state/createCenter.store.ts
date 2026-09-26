"use client";

import { create } from "zustand";

type ImageSlot = "main" | "detailing" | "interior";

type CreateState = {
  imageUrls: Record<ImageSlot, string | null>;
  /** Catalog service ids (GET /services) selected for this center */
  selectedServiceIds: string[];
  setImage: (slot: ImageSlot, url: string | null) => void;
  toggleService: (id: string) => void;
  reset: () => void;
};

const initialImages: Record<ImageSlot, string | null> = {
  main: null,
  detailing: null,
  interior: null,
};

export const useCreateCenterStore = create<CreateState>((set) => ({
  imageUrls: initialImages,
  selectedServiceIds: [],
  setImage: (slot, url) =>
    set((s) => ({ imageUrls: { ...s.imageUrls, [slot]: url } })),
  toggleService: (id) =>
    set((s) => ({
      selectedServiceIds: s.selectedServiceIds.includes(id)
        ? s.selectedServiceIds.filter((x) => x !== id)
        : [...s.selectedServiceIds, id],
    })),
  reset: () => set({ imageUrls: initialImages, selectedServiceIds: [] }),
}));

export type { ImageSlot };
