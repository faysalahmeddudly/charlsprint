import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { productService } from "@/services/product.service"
import { ApiClientError } from "@/services/api-client"

interface ProductPageParams {
  slug: string
}

async function getProduct(slug: string) {
  try {
    return await productService.getBySlug(slug)
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) return null
    throw error
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductPageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  return { title: product ? `${product.name} | CharlsPrint` : "Product not found" }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductPageParams>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const image = product.images[0]

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            width={600}
            height={600}
            className="size-full object-cover"
            priority
          />
        )}
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.currency,
            }).format(product.price)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <Button disabled={!product.inStock}>
          {product.inStock ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  )
}
