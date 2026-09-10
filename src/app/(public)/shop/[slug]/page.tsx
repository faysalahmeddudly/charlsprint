import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/shop/product-details"
import { getGarmentBySlug } from "../../create-design/_data"

interface ProductPageParams {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductPageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const garment = getGarmentBySlug(slug)
  return { title: garment ? `${garment.name} | CharlsPrint` : "Product not found" }
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<ProductPageParams>
}) {
  const { slug } = await params
  const garment = getGarmentBySlug(slug)

  if (!garment) notFound()

  return <ProductDetails garment={garment} />
}
