"use client";

import { create } from "zustand";
import type { ConfirmHandle } from "../api/auth.api";

/**
 * Layer: State
 * Tracks the multi-step OTP login flow.
 * Server session itself is owned by NextAuth.
 */

export type LoginStep = "phone" | "otp";

type AuthFlowState = {
  step: LoginStep;
  phone: string;
  confirm: ConfirmHandle | null;
  setPhone: (phone: string) => void;
  setConfirm: (handle: ConfirmHandle) => void;
  goToOtp: () => void;
  reset: () => void;
};

export const useAuthFlowStore = create<AuthFlowState>((set) => ({
  step: "phone",
  phone: "",
  confirm: null,
  setPhone: (phone) => set({ phone }),
  setConfirm: (confirm) => set({ confirm }),
  goToOtp: () => set({ step: "otp" }),
  reset: () => set({ step: "phone", phone: "", confirm: null }),
}));
