export interface CartItem {
  productId: string
  variantId?: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  currency: string
}
