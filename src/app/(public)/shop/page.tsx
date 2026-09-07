import type { Metadata } from "next"
import { ProductGrid } from "@/components/shop/product-grid"
import { productService } from "@/services/product.service"

export const metadata: Metadata = {
  title: "Shop | CharlsPrint",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query } = await searchParams
  const { items } = await productService.list({
    query: typeof query === "string" ? query : undefined,
  })





  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
      <ProductGrid products={items} />
    </div>
  )
}
