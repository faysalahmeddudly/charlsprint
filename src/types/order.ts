import type { CartItem } from "./cart"

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"

export interface ShippingAddress {
  fullName: string
  phone: string
  line1: string
  state: string
  postalCode: string
  addressLabel: "home" | "office"
}

export interface Order {
  id: string
  number: string
  status: OrderStatus
  items: CartItem[]
  total: number
  currency: string
  shippingAddress: ShippingAddress
  createdAt: string
  estimatedDelivery?: string
}

