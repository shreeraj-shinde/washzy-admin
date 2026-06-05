import { NextRequest, NextResponse } from "next/server";
import { deleteAccountSchema } from "@/app/delete-account/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = deleteAccountSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!backendUrl) {
      console.error("[delete-account] NEXT_PUBLIC_API_BASE_URL is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const upstream = await fetch(`${backendUrl}/deletion-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      const payload = await upstream.json().catch(() => ({})) as {
        error?: { message?: string };
      };
      if (upstream.status === 409) {
        return NextResponse.json(
          { error: payload.error?.message ?? "A deletion request is already pending for this account." },
          { status: 409 },
        );
      }
      console.error("[delete-account] backend returned", upstream.status, payload);
      return NextResponse.json({ error: "Request failed. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[delete-account] unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
