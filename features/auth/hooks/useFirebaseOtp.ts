"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendOtp, verifyOtp, clearFirebaseSession } from "../api/auth.api";
import { useAuthFlowStore } from "../state/auth.store";

/**
 * Layer: Hook
 * Orchestrates: API (firebase) → State (auth.store) → NextAuth signIn → router.
 * UI layer calls these — never touches the api or state directly.
 */

const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

export function useSendOtp() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setPhone, setConfirm, goToOtp } = useAuthFlowStore();

  async function trigger(phoneE164: string): Promise<void> {
    setPending(true);
    setError(null);
    try {
      const handle = await sendOtp(phoneE164, RECAPTCHA_CONTAINER_ID);
      setPhone(phoneE164);
      setConfirm(handle);
      goToOtp();
    } catch (err) {
      console.log(err);
      setError((err as Error).message ?? "Failed to send OTP");
    } finally {
      setPending(false);
    }
  }

  return { trigger, pending, error };
}

export function useVerifyOtp() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirm, reset } = useAuthFlowStore();
  const router = useRouter();
  const params = useSearchParams();

  async function trigger(code: string): Promise<void> {
    if (!confirm) {
      setError("Session expired. Please request a new OTP.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const idToken = await verifyOtp(confirm, code);
      const result = await signIn("firebase", { idToken, redirect: false });
      console.log(result);
      if (!result || result.error) {
        await clearFirebaseSession();
        setError(
          result?.error === "CredentialsSignin"
            ? "Not authorized. Admin access only."
            : (result?.error ?? "Sign-in failed."),
        );
        return;
      }
      reset();
      router.replace(params.get("from") ?? "/centers");
    } catch (err) {
      setError((err as Error).message ?? "Invalid OTP");
    } finally {
      setPending(false);
    }
  }

  return { trigger, pending, error };
}

export const recaptchaContainerId = RECAPTCHA_CONTAINER_ID;
