import { apiClient } from "./api-client"
import type { Order, OrderTrackingEvent } from "@/types"
import type { CheckoutInput } from "@/lib/validations/checkout"
import type { OrderTrackingInput } from "@/lib/validations/order-tracking"

export const orderService = {
  create: (input: CheckoutInput) => apiClient.post<Order>("/orders", input),
  getByNumber: (orderNumber: string) => apiClient.get<Order>(`/orders/${orderNumber}`),
  track: (input: OrderTrackingInput) =>
    apiClient.post<OrderTrackingEvent[]>("/orders/track", input),
}
