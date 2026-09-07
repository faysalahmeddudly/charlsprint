import type { Metadata } from "next"
import { OrderTrackingForm } from "@/components/order/order-tracking-form"

export const metadata: Metadata = {
  title: "Track your order | CharlsPrint",
}

export default function OrderTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Track your order</h1>
        <p className="text-sm text-muted-foreground">
          Enter your order number and email to see the latest status.
        </p>
      </div>
      <OrderTrackingForm />
    </div>
  )
}
