"use client";

import { create } from "zustand";
import type { ServiceTierKey } from "../api/createCenter";

type ImageSlot = "main" | "detailing" | "interior";

type CreateState = {
  imageUrls: Record<ImageSlot, string | null>;
  selectedTiers: ServiceTierKey[];
  setImage: (slot: ImageSlot, url: string | null) => void;
  toggleTier: (tier: ServiceTierKey) => void;
  reset: () => void;
};

const initialImages: Record<ImageSlot, string | null> = {
  main: null,
  detailing: null,
  interior: null,
};

export const useCreateCenterStore = create<CreateState>((set) => ({
  imageUrls: initialImages,
  selectedTiers: [],
  setImage: (slot, url) =>
    set((s) => ({ imageUrls: { ...s.imageUrls, [slot]: url } })),
  toggleTier: (tier) =>
    set((s) => ({
      selectedTiers: s.selectedTiers.includes(tier)
        ? s.selectedTiers.filter((t) => t !== tier)
        : [...s.selectedTiers, tier],
    })),
  reset: () => set({ imageUrls: initialImages, selectedTiers: [] }),
}));

export type { ImageSlot };
