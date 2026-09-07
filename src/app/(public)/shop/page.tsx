import type { Metadata } from "next"
import { ProductGrid } from "@/components/shop/product-grid"
import { garments } from "./_data"

export const metadata: Metadata = {
  title: "Shop | CharlsPrint",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query } = await searchParams
  const q = typeof query === "string" ? query.trim().toLowerCase() : ""

  const items = q
    ? garments.filter((garment) => garment.name.toLowerCase().includes(q))
    : garments

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
      <ProductGrid products={items} />
    </div>
  )
}
