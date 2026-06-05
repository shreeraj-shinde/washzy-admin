"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";
import { deleteAccountSchema, type DeleteAccountFormValues } from "./schema";

type Status = "idle" | "loading" | "success" | { kind: "error"; message: string };

export function DeleteAccountForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        return;
      }
      const data = await res.json().catch(() => ({})) as { error?: string };
      setStatus({
        kind: "error",
        message: data.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Unable to reach the server. Please try again later.",
      });
    }
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="h-14 w-14 rounded-full bg-teal-50 flex items-center justify-center">
          <svg
            className="h-7 w-7 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-navy-900">Request Received</h3>
        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
          We've received your account deletion request. You'll receive a
          confirmation at your registered email within 7 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          id="mobile"
          type="tel"
          maxLength={10}
          placeholder="10-digit mobile number"
          invalid={Boolean(errors.mobile)}
          {...register("mobile")}
        />
        {errors.mobile && (
          <p className="text-xs text-danger px-2">{errors.mobile.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Registered Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-danger px-2">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="reason">
          Reason{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </Label>
        <Textarea
          id="reason"
          rows={4}
          placeholder="Tell us why you want to delete your account (optional)"
          {...register("reason")}
        />
      </div>

      {typeof status === "object" && status.kind === "error" && (
        <p className="text-sm text-danger px-1">{status.message}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Submit Deletion Request"}
      </Button>

      <p className="text-xs text-text-muted text-center leading-relaxed">
        We will process your request within 7 business days and send a
        confirmation to your registered email. Wallet balance cannot be
        recovered after deletion.
      </p>
    </form>
  );
}
