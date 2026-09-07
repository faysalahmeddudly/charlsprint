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
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
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

export interface OrderTrackingEvent {
  status: OrderStatus
  label: string
  timestamp: string
  location?: string
}
