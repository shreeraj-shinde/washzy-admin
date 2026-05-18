import axios, { AxiosError, type AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";
import { env } from "./env";
import { error } from "console";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
});

apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    const token = session?.accessToken;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

// Handle Login
apiClient.interceptors.response.use(
  (r) => r,
  async (err: AxiosError) => {
    if (err.response?.status === 401 && typeof window !== undefined) {
      await signOut({ callbackUrl: "/login" });
    }
    return Promise.reject(err);
  },
);

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<{ error?: ApiError }>;
    return (
      e.response?.data?.error ?? {
        code: "NETWORK_ERROR",
        message: e.message,
      }
    );
  }
  return {
    code: "UNKNOWN",
    message: (err as Error)?.message ?? "Unknown error",
  };
}
