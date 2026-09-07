import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductCustomizer } from "@/components/shop/product-customizer"
import { getGarmentBySlug } from "../_data"

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

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductPageParams>
}) {
  const { slug } = await params
  const garment = getGarmentBySlug(slug)

  if (!garment) notFound()

  return <ProductCustomizer garment={garment} />
}
