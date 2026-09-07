import { z } from "zod"

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  line1: z.string().min(3, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
})

export const checkoutSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(["card", "cod"]),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
