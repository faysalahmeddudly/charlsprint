import { apiClient } from "./api-client"
import type { Cart, CartItem } from "@/types"

export const cartService = {
  get: () => apiClient.get<Cart>("/cart"),
  addItem: (item: Pick<CartItem, "productId" | "variantId" | "quantity">) =>
    apiClient.post<Cart>("/cart/items", item),
  updateItem: (productId: string, quantity: number) =>
    apiClient.patch<Cart>(`/cart/items/${productId}`, { quantity }),
  removeItem: (productId: string) => apiClient.delete<Cart>(`/cart/items/${productId}`),
}
