"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { CheckIcon, ChevronDownIcon, PaletteIcon, TypeIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import type { Garment } from "@/app/(public)/shop/_data"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export function ProductCustomizer({ garment }: { garment: Garment }) {
  const [activeZone, setActiveZone] = useState(garment.printZones[0]?.id)
  const [tierId, setTierId] = useState(garment.pricingTiers[0]?.id)
  const [colorId, setColorId] = useState(garment.colors[0]?.id)
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(garment.sizes.map((size) => [size.id, size.defaultQty]))
  )

  const tier = garment.pricingTiers.find((t) => t.id === tierId) ?? garment.pricingTiers[0]
  const activeColor = garment.colors.find((c) => c.id === colorId) ?? garment.colors[0]
  const image = garment.images[0]

  const totalUnits = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities]
  )

  const subtotal = totalUnits * garment.basePricePerUnit
  const discount = subtotal * tier.discountRate
  const total = subtotal - discount
  const perUnit = totalUnits > 0 ? total / totalUnits : 0

  function setQty(sizeId: string, value: number) {
    setQuantities((prev) => ({ ...prev, [sizeId]: Math.max(0, value) }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-2">
          {garment.printZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZone(zone.id)}
              className={cn(
                "flex flex-1 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                zone.id === activeZone
                  ? "bg-destructive/10 text-destructive"
                  : "hover:bg-muted"
              )}
            >
              <span className="font-medium">{zone.label}</span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-xs font-medium",
                  zone.status === "Applied"
                    ? "bg-destructive text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {zone.status}
              </span>
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-lg border border-border bg-muted/40 p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="rounded bg-background/80 px-2 py-1 shadow-sm">
              Center Offset: X: 0.00 mm | Y: -45.2 mm
            </span>
            <span className="rounded bg-background/80 px-2 py-1 shadow-sm">
              Print Window: 350 × 450 mm (Max DTG)
            </span>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xl">
            {image && (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-contain"
                priority
              />
            )}
            {activeZone === "front-chest" &&
              garment.printZones.find((z) => z.id === "front-chest")?.status === "Applied" && (
                <div className="pointer-events-none absolute left-1/2 top-[38%] w-[42%] -translate-x-1/2 border-2 border-dashed border-destructive/70">
                  <span className="absolute -top-6 left-0 rounded bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Print Zone
                  </span>
                  <div className="flex aspect-[7/9] flex-col items-center justify-center gap-1 bg-foreground/70 px-2 text-center text-white">
                    <p className="text-[10px] font-semibold tracking-wide sm:text-xs">
                      {garment.name.toUpperCase()}
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION A // GARMENT MODEL
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              In Stock ({garment.stockCount.toLocaleString()} pcs)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
              {image && (
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={56}
                  height={56}
                  className="size-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{garment.name}</p>
              <p className="text-xs text-muted-foreground">
                {garment.fabric} • {garment.fit}
              </p>
              <p className="text-xs font-medium text-destructive">SKU: {garment.sku}</p>
            </div>
            <Button variant="outline" size="sm">
              Change
              <ChevronDownIcon />
            </Button>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
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
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
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

        <section className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION C // GARMENT HUE
            </p>
            <button type="button" className="text-xs font-medium text-destructive">
              See More
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {garment.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.name}
                onClick={() => setColorId(color.id)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-md border transition-shadow",
                  color.id === colorId
                    ? "border-foreground ring-2 ring-offset-1 ring-foreground/40"
                    : "border-border"
                )}
                style={{ backgroundColor: color.swatch }}
              >
                {color.id === colorId && (
                  <CheckIcon
                    className="size-4"
                    style={{
                      color: ["cream", "tan", "grey", "sage"].includes(color.id)
                        ? "#111"
                        : "#fff",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
            SELECT VECTOR &amp; GRAPHICS ASSETS
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-md border border-border py-6 text-sm font-medium text-destructive transition-colors hover:bg-muted"
            >
              <PaletteIcon className="size-5" />
              Graphics
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-md border border-border py-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              <TypeIcon className="size-5" />
              Text
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-semibold">Instant Quote</p>
          <p className="text-xs text-muted-foreground">Transparent commercial tier pricing</p>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Garment Base ({totalUnits} pcs)</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Front Print (Full Color DTG)</span>
              <span>{activeZone === "front-chest" ? "Included" : "—"}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-emerald-600">
                <span className="font-medium">Discount</span>
                <span className="font-medium">-{currency(discount)}</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <div>
              <p className="text-xs text-muted-foreground">Total (ex. shipping):</p>
              <p className="text-[11px] text-muted-foreground">
                USD ({currency(perUnit)} / unit)
              </p>
            </div>
            <p className="text-2xl font-bold text-destructive">{currency(total)}</p>
          </div>
        </section>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" size="lg">
            Save Draft
          </Button>
          <Button
            className="flex-1 bg-destructive text-white hover:bg-destructive/90"
            size="lg"
            disabled={totalUnits === 0}
          >
            Order Now →
          </Button>
        </div>
      </div>
    </div>
  )
}
