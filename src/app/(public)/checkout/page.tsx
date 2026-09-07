import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Checkout | CharlsPrint",
}

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}
