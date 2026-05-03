"use client";

import { useAuthFlowStore } from "../state/auth.store";
import { PhoneStep } from "./PhoneStep";
import { OtpStep } from "./OtpStep";

export function LoginForm() {
  const step = useAuthFlowStore((s) => s.step);
  return step === "phone" ? <PhoneStep /> : <OtpStep />;
}
