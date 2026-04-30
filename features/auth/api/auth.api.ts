import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signOut as firebaseSignOut,
  type ConfirmationResult,
  type Auth,
} from "firebase/auth";
import { getFirebaseAuth } from "@/shared/lib/firebase";

/**
 * Layer: API
 * Pure Firebase calls. No React, no NextAuth.
 * Hooks orchestrate these into the UI flow.
 */

export type ConfirmHandle = {
  verificationId: string;
};

let recaptchaVerifier: RecaptchaVerifier | undefined;

function getRecaptcha(auth: Auth, containerId: string): RecaptchaVerifier {
  if (recaptchaVerifier) return recaptchaVerifier;
  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
  return recaptchaVerifier;
}

export async function sendOtp(
  phoneE164: string,
  recaptchaContainerId: string,
): Promise<ConfirmHandle> {
  const auth = getFirebaseAuth();
  const verifier = getRecaptcha(auth, recaptchaContainerId);
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(phoneE164, verifier);
  return { verificationId };
}

export async function verifyOtp(
  handle: ConfirmHandle,
  code: string,
): Promise<string> {
  const auth = getFirebaseAuth();
  const credential = PhoneAuthProvider.credential(handle.verificationId, code);
  const result = await signInWithCredential(auth, credential);
  return result.user.getIdToken();
}

export async function clearFirebaseSession(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
  recaptchaVerifier?.clear();
  recaptchaVerifier = undefined;
}

export type { ConfirmationResult };
