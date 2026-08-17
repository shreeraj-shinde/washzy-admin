"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { Select } from "@/shared/ui/Select";
import { Button } from "@/shared/ui/Button";
import {
  SUPPORT_CATEGORIES,
  supportRequestSchema,
  type SupportRequestFormValues,
} from "./schema";
import { submitSupportRequest } from "./actions";

type Status = "idle" | "loading" | "success" | { kind: "error"; message: string };

export function SupportForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportRequestFormValues>({
    resolver: zodResolver(supportRequestSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    const result = await submitSupportRequest(values);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus({ kind: "error", message: result.message });
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
        <h3 className="text-xl font-semibold text-navy-900">Thank you!</h3>
        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
          We&apos;ve received your message and our support team will connect
          with you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Honeypot — hidden from real users, left blank; bots tend to fill every field. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-danger px-2">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          defaultValue=""
          invalid={Boolean(errors.category)}
          {...register("category")}
        >
          <option value="" disabled>
            Select an issue type
          </option>
          {SUPPORT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        {errors.category && (
          <p className="text-xs text-danger px-2">{errors.category.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us what's going on…"
          invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-danger px-2">{errors.message.message}</p>
        )}
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
        {status === "loading" ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
