import { z } from "zod";

export const SUPPORT_CATEGORIES = [
  "Booking Issue",
  "Payment & Wallet",
  "App Bug",
  "Partner Center",
  "Other",
] as const;

export const supportRequestSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your full name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  category: z.enum(SUPPORT_CATEGORIES, {
    message: "Select a category",
  }),
  message: z
    .string()
    .min(10, "Please describe your issue in a bit more detail")
    .max(2000, "Message is too long"),
  // Honeypot: real users never fill this in; bots typically do.
  company: z.string().max(0).optional(),
});

export type SupportRequestFormValues = z.infer<typeof supportRequestSchema>;
