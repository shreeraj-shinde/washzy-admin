import type { ReactNode } from "react";
import Image from "next/image";

type Props = { children: ReactNode };

/**
 * Layer: UI
 * Static visual chrome from Figma 2011:39 — logo, title, card frame,
 * decorative blur orbs, and the "Secure Layer · v4.2.0 Global" footer.
 * The form steps (PhoneStep / OtpStep) are slotted in as children.
 */
export function LoginShell({ children }: Props) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6">
      <div
        className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl"
        style={{
          background: "rgba(0,105,107,0.10)",
          left: 64,
          top: 102,
        }}
      />
      <div
        className="pointer-events-none absolute h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "rgba(0,30,64,0.05)",
          right: 64,
          bottom: 102,
        }}
      />

      <div className="relative w-full max-w-[448px] flex flex-col items-center gap-8">
        <Image
          src="/washzy-logo.svg"
          alt="Washzy"
          width={125}
          height={72}
          priority
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.75px] text-navy-900">
            Washzy Admin
          </h1>
          <p className="mt-2 text-base text-teal-900">
            Management Console Access
          </p>
        </div>

        <div className="relative w-full bg-white rounded-card shadow-card overflow-hidden px-10 py-14">
          <div
            className="pointer-events-none absolute -top-12 -right-16 h-32 w-32 rounded-full blur-2xl"
            style={{ background: "rgba(0,105,107,0.05)" }}
          />
          {children}
        </div>

        <p className="text-sm text-text-muted">
          Need technical support?{" "}
          <span className="text-navy-900 font-medium">Contact System Admin</span>
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-40">
        <span className="text-[10px] tracking-[1px] uppercase text-navy-900">
          Secure Layer
        </span>
        <span className="h-1 w-1 rounded-full bg-divider" />
        <span className="text-[10px] tracking-[1px] uppercase text-navy-900">
          v4.2.0 Global
        </span>
      </div>
    </div>
  );
}
