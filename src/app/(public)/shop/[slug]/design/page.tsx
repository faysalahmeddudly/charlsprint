import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductCustomizer } from "@/components/shop/product-customizer"
import { getGarmentBySlug } from "../../_data"

interface DesignPageParams {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DesignPageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const garment = getGarmentBySlug(slug)
  return { title: garment ? `Design ${garment.name} | CharlsPrint` : "Product not found" }
}

export default async function DesignPage({
  params,
  searchParams,
}: {
  params: Promise<DesignPageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { color, tier } = await searchParams
  const garment = getGarmentBySlug(slug)

  if (!garment) notFound()

  return (
    <ProductCustomizer
      garment={garment}
      initialColorId={typeof color === "string" ? color : undefined}
      initialTierId={typeof tier === "string" ? tier : undefined}
    />
  )
}
