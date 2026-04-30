"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { useVerifyOtp } from "../hooks/useFirebaseOtp";
import { useAuthFlowStore } from "../state/auth.store";

const schema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
type FormValues = z.infer<typeof schema>;

export function OtpStep() {
  const { trigger, pending, error } = useVerifyOtp();
  const { phone, reset } = useAuthFlowStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((v) => trigger(v.code))}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <Label htmlFor="code">Verification Code</Label>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-text-muted hover:text-navy-900"
          >
            Change number
          </button>
        </div>
        <Input
          id="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="• • • • • •"
          leadingIcon={<KeyRound size={18} />}
          invalid={Boolean(errors.code)}
          {...register("code")}
        />
        <p className="text-xs text-text-muted px-2">
          Sent to <span className="text-navy-900 font-medium">{phone}</span>
        </p>
        {errors.code ? (
          <p className="text-xs text-danger px-2">{errors.code.message}</p>
        ) : null}
        {error ? <p className="text-xs text-danger px-2">{error}</p> : null}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Verifying…" : "Sign In to Console"} <ArrowRight size={16} />
      </Button>
    </form>
  );
}
