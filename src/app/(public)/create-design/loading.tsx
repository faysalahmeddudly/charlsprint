import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"

export default function ShopLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-24 animate-pulse rounded bg-muted" />
      <ProductGridSkeleton />
    </div>
  )
}
