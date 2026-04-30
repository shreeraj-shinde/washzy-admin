"use client";

import { signOut, useSession } from "next-auth/react";
import { clearFirebaseSession } from "../api/auth.api";

export function useAuth() {
  const { data: session, status } = useSession();

  async function logout(): Promise<void> {
    await clearFirebaseSession();
    await signOut({ callbackUrl: "/login" });
  }

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    logout,
  };
}
