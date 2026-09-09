import { z } from "zod"

export const AU_STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(7, "Enter a valid mobile number"),
  line1: z.string().min(3, "Address is required"),
  state: z.string().min(1, "Please select a state"),
  postalCode: z.string().min(3, "Postal code is required"),
  addressLabel: z.enum(["home", "office"]),
})

export const checkoutSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(["card", "cod"]),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
