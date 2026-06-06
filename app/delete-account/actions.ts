"use server";

import { deleteAccountSchema, type DeleteAccountFormValues } from "./schema";

type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitDeletionRequest(values: DeleteAccountFormValues): Promise<ActionResult> {
  const parsed = deleteAccountSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!backendUrl) {
    console.error("[delete-account] NEXT_PUBLIC_API_BASE_URL is not set");
    return { ok: false, message: "Server misconfiguration" };
  }

  const internalKey = process.env.INTERNAL_API_SECRET;
  if (!internalKey) {
    console.error("[delete-account] INTERNAL_API_SECRET is not set");
    return { ok: false, message: "Server misconfiguration" };
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${backendUrl}/deletion-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-key": internalKey,
      },
      body: JSON.stringify(parsed.data),
    });
  } catch (err) {
    console.error("[delete-account] fetch error:", err);
    return { ok: false, message: "Unable to reach the server. Please try again later." };
  }

  if (!upstream.ok) {
    const payload = await upstream.json().catch(() => ({})) as { error?: { message?: string } };
    if (upstream.status === 409) {
      return { ok: false, message: payload.error?.message ?? "A deletion request is already pending for this account." };
    }
    console.error("[delete-account] backend returned", upstream.status, payload);
    return { ok: false, message: "Request failed. Please try again." };
  }

  return { ok: true };
}
