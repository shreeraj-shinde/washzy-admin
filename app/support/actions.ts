"use server";

import { sendMail } from "@/shared/lib/mailer";
import { supportRequestSchema, type SupportRequestFormValues } from "./schema";

type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitSupportRequest(
  values: SupportRequestFormValues,
): Promise<ActionResult> {
  const parsed = supportRequestSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { name, email, category, message, company } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn to adjust.
  if (company) {
    return { ok: true };
  }

  const to = process.env.SUPPORT_TO_EMAIL;
  if (!to) {
    console.error("[support] SUPPORT_TO_EMAIL is not set");
    return { ok: false, message: "Server misconfiguration" };
  }

  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `[Washzy Support] ${category} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Category: ${category}`,
        "",
        message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Category:</strong> ${escapeHtml(category)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("[support] failed to send email:", err);
    return { ok: false, message: "Unable to send your message. Please try again later." };
  }

  return { ok: true };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
