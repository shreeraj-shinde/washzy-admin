"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { useSendOtp, recaptchaContainerId } from "../hooks/useFirebaseOtp";

const schema = z.object({
  phone: z
    .string()
    .regex(/^\+\d{10,15}$/, "Use E.164 format, e.g. +919876543210"),
});
type FormValues = z.infer<typeof schema>;

export function PhoneStep() {
  const { trigger, pending, error } = useSendOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "+91" },
  });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((v) => trigger(v.phone))}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          leadingIcon={<Phone size={18} />}
          invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        {errors.phone ? (
          <p className="text-xs text-danger px-2">{errors.phone.message}</p>
        ) : null}
        {error ? <p className="text-xs text-danger px-2">{error}</p> : null}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Sending OTP…" : "Send OTP"} <ArrowRight size={16} />
      </Button>

      <div id={recaptchaContainerId} />
    </form>
  );
}
