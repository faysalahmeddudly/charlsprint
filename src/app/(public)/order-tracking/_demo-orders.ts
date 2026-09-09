import type { Order } from "@/types"

// Backend order lookup isn't implemented yet. Until then, these demo orders let the
// tracking UI be exercised end-to-end by number.
export const demoOrders: Record<string, Order> = {
  "96459761": {
    id: "demo-96459761",
    number: "96459761",
    status: "processing",
    items: [
      {
        productId: "1",
        variantId: "black",
        name: "AS Colour 5001 Staple",
        image: "/shirt.png",
        price: 18.9,
        quantity: 1,
      },
    ],
    total: 18.9,
    currency: "USD",
    shippingAddress: {
      fullName: "Demo Customer",
      phone: "0400 000 000",
      line1: "1 Example Street",
      state: "NSW",
      postalCode: "2000",
      addressLabel: "home",
    },
    createdAt: "2023-09-13T21:42:00.000Z",
    estimatedDelivery: "2025-01-23T00:00:00.000Z",
  },
}
