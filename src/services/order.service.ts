import { apiClient } from "./api-client"
import type { Order } from "@/types"
import type { CheckoutInput } from "@/lib/validations/checkout"

export const orderService = {
  create: (input: CheckoutInput) => apiClient.post<Order>("/orders", input),
  getByNumber: (orderNumber: string) => apiClient.get<Order>(`/orders/${orderNumber}`),
}
