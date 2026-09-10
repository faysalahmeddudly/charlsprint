"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckIcon, ShoppingBagIcon, ArrowRightIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ColorPickerDialog } from "@/components/shop/color-picker-dialog"
import {
  currency,
  isLightColor,
  VISIBLE_COLOR_COUNT,
} from "@/components/shop/product-customizer.constants"
import type { Garment } from "@/app/(public)/create-design/_data"

const SURFACE_CARD = "rounded-2xl bg-card-secondary p-4"

export function ProductDetails({ garment }: { garment: Garment }) {
  const { addItem } = useCart()
  const [activeImageId, setActiveImageId] = useState(garment.images[0]?.id)
  const [tierId, setTierId] = useState(garment.pricingTiers[0]?.id)
  const [colorId, setColorId] = useState(garment.colors[0]?.id)
  const [colorModalOpen, setColorModalOpen] = useState(false)

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(garment.sizes.map((size) => [size.id, size.defaultQty]))
  )

  const [justAdded, setJustAdded] = useState(false)

  const tier = garment.pricingTiers.find((t) => t.id === tierId) ?? garment.pricingTiers[0]
  const activeColor = garment.colors.find((c) => c.id === colorId) ?? garment.colors[0]
  const activeImage =
    garment.images.find((image) => image.id === activeImageId) ?? garment.images[0]

  const totalUnits = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities]
  )

  const discountPercent =
    garment.compareAtPrice && garment.compareAtPrice > garment.price
      ? Math.round((1 - garment.price / garment.compareAtPrice) * 100)
      : undefined

  function setQty(sizeId: string, value: number) {
    setQuantities((prev) => ({ ...prev, [sizeId]: Math.max(0, value) }))
  }

  function handleAddToCart() {
    if (totalUnits === 0 || !activeImage) return
    addItem({
      productId: garment.id,
      variantId: activeColor?.id,
      name: garment.name,
      image: activeImage.url,
      price: garment.price,
      quantity: totalUnits,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const designHref = `/shop/${garment?.id}/design${
    colorId || tierId
      ? `?${new URLSearchParams({
          ...(colorId ? { color: colorId } : {}),
          ...(tierId ? { tier: tierId } : {}),
        }).toString()}`
      : ""
  }`

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/40">
            {activeImage && (
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
          {garment.images.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {garment.images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImageId(image.id)}
                  className={cn(
                    "relative size-16 shrink-0 overflow-hidden rounded-md border-2 bg-muted/40",
                    image.id === activeImage?.id ? "border-destructive" : "border-transparent"
                  )}
                >
                  <Image src={image.url} alt={image.alt} fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{garment.name}</h1>
            <p className="text-xs text-muted-foreground">
              {garment.fabric} • {garment.fit}
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-destructive">
              {currency(garment.price)}
            </span>
            {discountPercent !== undefined && garment.compareAtPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {currency(garment.compareAtPrice)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <section className={SURFACE_CARD}>
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION B // SIZE DISTRIBUTION
            </p>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {garment.pricingTiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTierId(t.id)}
                  className={cn(
                    "rounded-md px-2 py-2 text-xs font-medium transition-colors",
                    t.id === tier.id
                      ? "bg-destructive text-white"
                      : "bg-background text-muted-foreground hover:bg-background/70"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {garment.sizes.map((size) => (
                <div key={size.id} className="space-y-1 text-center">
                  <p className="text-[11px] text-muted-foreground">{size.label}</p>
                  <input
                    type="number"
                    min={0}
                    value={quantities[size.id]}
                    onChange={(e) => setQty(size.id, Number(e.target.value))}
                    className="h-8 w-full rounded-md border border-input bg-transparent text-center text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Aggregate Batch Run:</span>
              <span className="text-lg font-semibold text-destructive">
                {totalUnits} <span className="text-xs font-medium text-foreground">units total</span>
              </span>
            </div>
          </section>

          <section className={SURFACE_CARD}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                SECTION C // GARMENT HUE
              </p>
              {garment.colors.length > VISIBLE_COLOR_COUNT && (
                <button
                  type="button"
                  onClick={() => setColorModalOpen(true)}
                  className="text-xs font-medium text-destructive"
                >
                  See More
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {garment.colors.slice(0, VISIBLE_COLOR_COUNT).map((color) => (
                <button
                  key={color.id}
                  type="button"
                  title={color.name}
                  onClick={() => setColorId(color.id)}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-md border transition-shadow",
                    color.id === colorId
                      ? "border-foreground ring-2 ring-offset-1 ring-foreground/40"
                      : "border-border"
                  )}
                  style={{ backgroundColor: color.swatch }}
                >
                  {color.id === colorId && (
                    <CheckIcon
                      className="size-4"
                      style={{ color: isLightColor(color.swatch) ? "#111" : "#fff" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={totalUnits === 0}
              onClick={handleAddToCart}
            >
              <ShoppingBagIcon />
              {justAdded ? "Added ✓" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-destructive text-white hover:bg-destructive/90"
              nativeButton={false}
              render={<Link href={designHref} />}
            >
              Start Design
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {garment.sizeChart && garment.sizeChart.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">Size</th>
                <th className="px-3 py-2 text-left font-medium">Length</th>
                <th className="px-3 py-2 text-left font-medium">Width</th>
                <th className="px-3 py-2 text-left font-medium">Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {garment.sizeChart.map((row) => (
                <tr key={row.size} className="border-b border-border/60">
                  <td className="px-3 py-2 font-medium">{row.size}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.length}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.width}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ColorPickerDialog
        garment={garment}
        open={colorModalOpen}
        onOpenChange={setColorModalOpen}
        colorId={colorId}
        onAccept={setColorId}
      />
    </div>
  )
}
