import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]

  return (
    <Link href={`/shop/${product.slug}`} className="group block space-y-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            width={400}
            height={400}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </p>
      </div>
    </Link>
  )
}
