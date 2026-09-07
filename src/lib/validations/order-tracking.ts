import { z } from "zod"

export const orderTrackingSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
})

export type OrderTrackingInput = z.infer<typeof orderTrackingSchema>
