import type { Metadata } from "next"
import { Suspense } from "react"
import { ShopContent } from "@/components/shop/shop-content"
import { ShopSkeleton } from "@/components/skeletons/shop-skeleton"
import { shopProducts, shopCategories, shopTags } from "./_data"

export const metadata: Metadata = {
  title: "Shop | CharlsPrint",
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent products={shopProducts} categories={shopCategories} tags={shopTags} />
    </Suspense>
  )
}
