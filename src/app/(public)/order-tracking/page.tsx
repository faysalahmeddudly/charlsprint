import type { Metadata } from "next"
import { OrderTrackingPanel } from "@/components/order/order-tracking-panel"
import { RecentlyExploredSection } from "@/components/order/recently-explored-section"

export const metadata: Metadata = {
  title: "Track your order | CharlsPrint",
}

export default function OrderTrackingPage() {
  return (
    <div className="space-y-12">
      <OrderTrackingPanel />
      <RecentlyExploredSection />
    </div>
  )
}
