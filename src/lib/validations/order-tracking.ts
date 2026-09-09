import { z } from "zod"

export const orderTrackingSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
})

export type OrderTrackingInput = z.infer<typeof orderTrackingSchema>
