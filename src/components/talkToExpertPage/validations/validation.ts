import { z } from "zod"

export const talkToExpertSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Valid email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((value) => value.replace(/[\s-]/g, ""))
    .refine((value) => /^\+\d{7,15}$/.test(value), {
      message: "Please enter a valid phone number (7–15 digits, digits only)",
    }),

  message: z.string().min(1, "Message cannot be empty"),
  method: z.string().min(1, "Please select a contact method"),
  time: z.string().min(1, "Please select a preferred time"),
})

export type TalkToExpertSchema = z.infer<typeof talkToExpertSchema>
