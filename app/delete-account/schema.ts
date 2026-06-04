import { z } from "zod";

export const deleteAccountSchema = z.object({
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(10, "Enter a valid 10-digit mobile number")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  reason: z.string().optional(),
});

export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;
