"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bird,
  Bold,
  Box,
  CaseSensitive,
  CheckIcon,
  ChevronDownIcon,
  Cpu,
  Flag,
  Focus,
  InfoIcon,
  Italic,
  Leaf,
  Minus,
  Mountain,
  PaletteIcon,
  Pipette,
  PlusIcon,
  Ruler,
  SearchIcon,
  Shirt,
  Skull,
  Sun,
  TypeIcon,
  Underline,
  UploadCloudIcon,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { anton, bebasNeue, cinzel, plusJakartaSans } from "@/lib/fonts"
import type { Garment } from "@/app/(public)/shop/_data"

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export const VISIBLE_COLOR_COUNT = 8

const SURFACE_CARD = "rounded-2xl bg-sky-50/70 p-4 dark:bg-sky-500/5"

const ZONE_ICONS: Record<string, LucideIcon> = {
  "front-chest": Shirt,
  "back-body": Shirt,
  "left-sleeve": Ruler,
  "right-sleeve": Ruler,
}

export function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

interface GraphicAsset {
  id: string
  name: string
  meta: string
  category: string
  tile: string
  iconColor: string
  icon: LucideIcon
}

const GRAPHIC_CATEGORIES = [
  "All Assets",
  "Streetwear & Y2K",
  "Mascots & Skulls",
  "Vintage & Crests",
  "Minimalist Badges",
  "Typography Marks",
  "Band & Concert",
]

const GRAPHIC_ASSETS: GraphicAsset[] = [
  {
    id: "skull",
    name: "Overdrive Skull Emblem",
    meta: "Vector SVG • 2 Colors",
    category: "Mascots & Skulls",
    tile: "bg-neutral-900",
    iconColor: "text-white",
    icon: Skull,
  },
  {
    id: "circuit",
    name: "Cyber Circuit Core",
    meta: "Vector • Y2K Tech",
    category: "Streetwear & Y2K",
    tile: "bg-neutral-900",
    iconColor: "text-cyan-400",
    icon: Cpu,
  },
  {
    id: "kanji",
    name: "Tokyo Racing Kanji",
    meta: "Vector • JDM Division",
    category: "Streetwear & Y2K",
    tile: "bg-neutral-900",
    iconColor: "text-orange-400",
    icon: Flag,
  },
  {
    id: "alpine",
    name: "Alpine Explorer Badge",
    meta: "Outdoor • Stamp Line",
    category: "Minimalist Badges",
    tile: "bg-emerald-900",
    iconColor: "text-emerald-300",
    icon: Mountain,
  },
  {
    id: "flora",
    name: "Acid Flora Botanical",
    meta: "Vector • Botanical",
    category: "Vintage & Crests",
    tile: "bg-purple-900",
    iconColor: "text-lime-400",
    icon: Leaf,
  },
  {
    id: "sunburst",
    name: "Retro Sunburst 70s",
    meta: "Vector • Retro",
    category: "Vintage & Crests",
    tile: "bg-amber-900",
    iconColor: "text-amber-300",
    icon: Sun,
  },
  {
    id: "griffin",
    name: "Gothic Metal Griffin",
    meta: "Vector • Band Series",
    category: "Band & Concert",
    tile: "bg-neutral-900",
    iconColor: "text-red-400",
    icon: Bird,
  },
  {
    id: "bolt",
    name: "Speed Bolt Monogram",
    meta: "Vector • Typography",
    category: "Typography Marks",
    tile: "bg-blue-950",
    iconColor: "text-sky-300",
    icon: Zap,
  },
]

interface TextFont {
  id: string
  label: string
  sublabel: string
  cssVar: string
  family: string
}

const TEXT_FONTS: TextFont[] = [
  {
    id: "bebas-neue",
    label: "Bebas Neue",
    sublabel: "Athletic Condensed",
    cssVar: "var(--font-bebas-neue)",
    family: bebasNeue.style.fontFamily,
  },
  {
    id: "heavy-gothic",
    label: "Heavy Gothic",
    sublabel: "Streetwear Impact",
    cssVar: "var(--font-anton)",
    family: anton.style.fontFamily,
  },
  {
    id: "jakarta-modern",
    label: "Jakarta Modern",
    sublabel: "Clean Tech Editorial",
    cssVar: "var(--font-plus-jakarta-sans)",
    family: plusJakartaSans.style.fontFamily,
  },
  {
    id: "cinzel-luxury",
    label: "Cinzel Luxury",
    sublabel: "Vintage Roman Serif",
    cssVar: "var(--font-cinzel)",
    family: cinzel.style.fontFamily,
  },
]

const INK_TONES = ["#FFFFFF", "#F97316", "#EAB308", "#06B6D4", "#10B981", "#CBD5E1", "#CA8A04", "#E11D48"]

interface TextStyle {
  value: string
  subtitle: string
  fontId: string
  fontScale: number
  letterSpacing: number
  align: "left" | "center" | "right" | "justify"
  bold: boolean
  italic: boolean
  underline: boolean
  uppercase: boolean
  curvature: number
  outline: boolean
  outlineWidth: number
  color: string
}

const DEFAULT_TEXT_STYLE: TextStyle = {
  value: "Overdrive\nArchive",
  subtitle: "AUTONOMOUS SPEED DIVISION • 2024",
  fontId: TEXT_FONTS[0].id,
  fontScale: 42,
  letterSpacing: 2.5,
  align: "center",
  bold: true,
  italic: false,
  underline: false,
  uppercase: true,
  curvature: 0,
  outline: false,
  outlineWidth: 2,
  color: "#FFFFFF",
}

type ZoneContent =
  | { type: "graphic"; assetId: string }
  | ({ type: "text" } & TextStyle)
  | undefined

export function ProductCustomizer({
  garment,
  initialColorId,
  initialTierId,
}: {
  garment: Garment
  initialColorId?: string
  initialTierId?: string
}) {
  const [activeZone, setActiveZone] = useState(garment.printZones[0]?.id)
  const [tierId, setTierId] = useState(
    garment.pricingTiers.find((t) => t.id === initialTierId)?.id ?? garment.pricingTiers[0]?.id
  )
  const [colorId, setColorId] = useState(
    garment.colors.find((c) => c.id === initialColorId)?.id ?? garment.colors[0]?.id
  )
  const [colorModalOpen, setColorModalOpen] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(garment.sizes.map((size) => [size.id, size.defaultQty]))
  )
  const [zoneContent, setZoneContent] = useState<Record<string, ZoneContent>>(() =>
    Object.fromEntries(
      garment.printZones.map((zone) => [
        zone.id,
        zone.status === "Applied" ? { type: "graphic", assetId: "skull" } : undefined,
      ])
    )
  )
  const [graphicsModalOpen, setGraphicsModalOpen] = useState(false)
  const [graphicsModalTab, setGraphicsModalTab] = useState<"graphics" | "text">("graphics")
  const [zoom, setZoom] = useState(100)
  const [inspect3D, setInspect3D] = useState(false)

  function zoomBy(delta: number) {
    setZoom((prev) => Math.min(200, Math.max(50, prev + delta)))
  }

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
        <div className="flex flex-wrap gap-2">
          {garment.printZones.map((zone) => {
            const applied = Boolean(zoneContent[zone.id])
            const Icon = ZONE_ICONS[zone.id] ?? Shirt
            const active = zone.id === activeZone
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZone(zone.id)}
                className={cn(
                  "flex flex-1 items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                  active
                    ? "border-transparent bg-destructive text-white shadow-sm"
                    : "border-border bg-card hover:bg-muted"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      zone.id === "right-sleeve" && "-scale-x-100",
                      active ? "text-white" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "truncate font-medium",
                      active ? "font-plus-jakarta-sans" : "font-sans"
                    )}
                  >
                    {zone.label}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium",
                    active
                      ? "bg-white/20 text-white"
                      : applied
                        ? "bg-destructive text-white"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {applied ? "1 Applied" : "Empty"}
                </span>
              </button>
            )
          })}
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

          <div
            className="relative mx-auto aspect-square w-full max-w-xl transition-transform duration-200"
            style={{
              transform: inspect3D
                ? `perspective(900px) rotateY(-18deg) scale(${zoom / 100})`
                : `scale(${zoom / 100})`,
            }}
          >
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
              (() => {
                const content = zoneContent["front-chest"]
                if (!content) return null
                const asset =
                  content.type === "graphic"
                    ? GRAPHIC_ASSETS.find((a) => a.id === content.assetId)
                    : undefined
                return (
                  <div className="pointer-events-none absolute left-1/2 top-[38%] w-[42%] -translate-x-1/2 border-2 border-dashed border-destructive/70">
                    <span className="absolute -top-6 left-0 rounded bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      Print Zone
                    </span>
                    <div className="flex aspect-[7/9] flex-col items-center justify-center gap-1.5 bg-foreground/70 px-2 text-center text-white">
                      {content.type === "graphic" && asset && (
                        <>
                          <asset.icon className="size-8" />
                          <p className="text-[10px] font-semibold tracking-wide sm:text-xs">
                            {asset.name.toUpperCase()}
                          </p>
                        </>
                      )}
                      {content.type === "text" && (
                        <div
                          className="flex flex-col items-center gap-1"
                          style={{ transform: `skewY(${(content.curvature / 100) * -6}deg)` }}
                        >
                          <p
                            className="break-words text-sm sm:text-base"
                            style={{
                              fontFamily: TEXT_FONTS.find((f) => f.id === content.fontId)?.cssVar,
                              fontWeight: content.bold ? 700 : 400,
                              fontStyle: content.italic ? "italic" : "normal",
                              textDecoration: content.underline ? "underline" : "none",
                              textTransform: content.uppercase ? "uppercase" : "none",
                              textAlign: content.align,
                              letterSpacing: `${content.letterSpacing}mm`,
                              color: content.color,
                              WebkitTextStroke: content.outline
                                ? `${content.outlineWidth / 2}px ${content.color}`
                                : undefined,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {content.value}
                          </p>
                          <p className="text-[9px] tracking-widest text-white/80 sm:text-[10px]">
                            {content.subtitle}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })()}
          </div>

          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="flex items-center gap-1 rounded-full border border-border bg-background/95 px-2 py-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => zoomBy(10)}
                disabled={zoom >= 200}
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                aria-label="Zoom in"
              >
                <PlusIcon className="size-4" />
              </button>
              <span className="min-w-10 text-center text-sm font-medium tabular-nums">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(-10)}
                disabled={zoom <= 50}
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                aria-label="Zoom out"
              >
                <Minus className="size-4" />
              </button>

              <span className="mx-1 h-5 w-px bg-border" />

              <button
                type="button"
                onClick={() => setZoom(100)}
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Reset view"
              >
                <Focus className="size-4" />
              </button>

              <span className="mx-1 h-5 w-px bg-border" />

              <button
                type="button"
                onClick={() => setInspect3D((prev) => !prev)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium transition-colors",
                  inspect3D
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-pressed={inspect3D}
              >
                <Box className="size-4" />
                Inspect 3D
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <section className={SURFACE_CARD}>
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
          <div className="flex flex-nowrap gap-2 overflow-hidden">
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

        <section className={SURFACE_CARD}>
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
            SELECT VECTOR &amp; GRAPHICS ASSETS
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setGraphicsModalTab("graphics")
                setGraphicsModalOpen(true)
              }}
              className="flex flex-col items-center gap-2 rounded-xl bg-background py-6 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-background/70"
            >
              <PaletteIcon className="size-5" />
              Graphics
            </button>
            <button
              type="button"
              onClick={() => {
                setGraphicsModalTab("text")
                setGraphicsModalOpen(true)
              }}
              className="flex flex-col items-center gap-2 rounded-xl bg-background py-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/70"
            >
              <TypeIcon className="size-5" />
              Text
            </button>
          </div>
        </section>

        <section className={SURFACE_CARD}>
          <p className="text-sm font-semibold">Instant Quote</p>
          <p className="text-xs text-muted-foreground">Transparent commercial tier pricing</p>
        </section>

        <section className={SURFACE_CARD}>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Garment Base ({totalUnits} pcs)</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Front Print (Full Color DTG)</span>
              <span>{zoneContent["front-chest"] ? "Included" : "—"}</span>
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

      <ColorPickerDialog
        garment={garment}
        open={colorModalOpen}
        onOpenChange={setColorModalOpen}
        colorId={colorId}
        onAccept={setColorId}
      />

      <GraphicsLibraryDialog
        open={graphicsModalOpen}
        onOpenChange={setGraphicsModalOpen}
        initialTab={graphicsModalTab}
        appliedContent={activeZone ? zoneContent[activeZone] : undefined}
        onApplyGraphic={(assetId) =>
          activeZone &&
          setZoneContent((prev) => ({ ...prev, [activeZone]: { type: "graphic", assetId } }))
        }
        onApplyText={(style) =>
          activeZone &&
          setZoneContent((prev) => ({ ...prev, [activeZone]: { type: "text", ...style } }))
        }
      />
    </div>
  )
}

export function ColorPickerDialog({
  garment,
  open,
  onOpenChange,
  colorId,
  onAccept,
}: {
  garment: Garment
  open: boolean
  onOpenChange: (open: boolean) => void
  colorId: string | undefined
  onAccept: (colorId: string) => void
}) {
  const [pendingColorId, setPendingColorId] = useState(colorId)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setPendingColorId(colorId)
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-2 space-y-0">
          <InfoIcon className="size-4 shrink-0 text-blue-500" />
          <DialogTitle>Select Color</DialogTitle>
          <DialogDescription className="sr-only">
            Choose a colour for {garment.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto rounded-lg border border-border bg-muted/40 p-4">
          <div className="grid grid-cols-6 gap-3 sm:grid-cols-8">
            {garment.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.name}
                onClick={() => setPendingColorId(color.id)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg border transition-shadow",
                  color.id === pendingColorId
                    ? "border-foreground ring-2 ring-offset-1 ring-foreground/40"
                    : "border-border/60"
                )}
                style={{ backgroundColor: color.swatch }}
              >
                {color.id === pendingColorId && (
                  <CheckIcon
                    className="size-4"
                    style={{ color: isLightColor(color.swatch) ? "#111" : "#fff" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={!pendingColorId}
            onClick={() => {
              if (pendingColorId) onAccept(pendingColorId)
              onOpenChange(false)
            }}
          >
            Accept →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function GraphicsLibraryDialog({
  open,
  onOpenChange,
  initialTab,
  appliedContent,
  onApplyGraphic,
  onApplyText,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTab: "graphics" | "text"
  appliedContent: ZoneContent
  onApplyGraphic: (assetId: string) => void
  onApplyText: (style: TextStyle) => void
}) {
  const [tab, setTab] = useState<"graphics" | "text">(initialTab)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Assets")
  const [pendingAssetId, setPendingAssetId] = useState<string | undefined>(
    appliedContent?.type === "graphic" ? appliedContent.assetId : undefined
  )
  const [textStyle, setTextStyle] = useState<TextStyle>(
    appliedContent?.type === "text" ? appliedContent : DEFAULT_TEXT_STYLE
  )

  const filteredAssets = GRAPHIC_ASSETS.filter((asset) => {
    const matchesCategory = category === "All Assets" || asset.category === category
    const matchesSearch = asset.name.toLowerCase().includes(search.trim().toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setTab(initialTab)
          setSearch("")
          setCategory("All Assets")
          setPendingAssetId(appliedContent?.type === "graphic" ? appliedContent.assetId : undefined)
          setTextStyle(appliedContent?.type === "text" ? appliedContent : DEFAULT_TEXT_STYLE)
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className={cn("max-h-[90vh] overflow-y-auto", tab === "text" ? "sm:max-w-5xl" : "sm:max-w-3xl")}>
        <DialogHeader className="flex-row flex-wrap items-start gap-3 space-y-0">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <PaletteIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle>Vector &amp; Graphics Asset Library</DialogTitle>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                300+ DPI PRINT READY
              </span>
            </div>
            <DialogDescription>
              Pick from curated vector graphics, badges, or upload custom raster/SVG artwork.
            </DialogDescription>
          </div>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setTab("graphics")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                tab === "graphics" ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              <PaletteIcon className="size-3.5" />
              Graphics &amp; Artwork
            </button>
            <button
              type="button"
              onClick={() => setTab("text")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                tab === "text" ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              <TypeIcon className="size-3.5" />
              Add &amp; Style Text
            </button>
          </div>
        </DialogHeader>

        {tab === "graphics" ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border px-4 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <UploadCloudIcon className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Upload your own artwork or vector file</p>
                  <p className="text-xs text-muted-foreground">
                    Supports SVG, AI, EPS, high-resolution PNG, or PDF (Max 50MB, Automatic DPI
                    &amp; Bleed Check)
                  </p>
                </div>
              </div>
              <Button type="button" className="shrink-0 bg-foreground text-background hover:bg-foreground/90">
                <UploadCloudIcon className="size-3.5" />
                Upload from Computer
              </Button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assets…"
                  className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                Sort by:
                <span className="flex items-center gap-1 rounded-lg border border-input px-2.5 py-1.5 font-medium text-foreground">
                  Popular Streetwear
                  <ChevronDownIcon className="size-3.5" />
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {GRAPHIC_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    category === c
                      ? "bg-destructive text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid max-h-72 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4">
              {filteredAssets.map((asset) => {
                const applied = pendingAssetId === asset.id
                const Icon = asset.icon
                return (
                  <div
                    key={asset.id}
                    className={cn(
                      "rounded-lg border p-3",
                      applied ? "border-destructive ring-1 ring-destructive" : "border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "flex aspect-square items-center justify-center rounded-md",
                        asset.tile
                      )}
                    >
                      <Icon className={cn("size-10", asset.iconColor)} />
                    </div>
                    <p className="mt-2 line-clamp-1 text-sm font-semibold">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.meta}</p>
                    <button
                      type="button"
                      onClick={() => setPendingAssetId(asset.id)}
                      className={cn(
                        "mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold transition-colors",
                        applied
                          ? "bg-destructive text-white"
                          : "bg-muted text-foreground hover:bg-muted/70"
                      )}
                    >
                      {applied ? (
                        <>
                          <CheckIcon className="size-3.5" />
                          Currently Applied
                        </>
                      ) : (
                        <>
                          <PlusIcon className="size-3.5" />
                          Add to Garment
                        </>
                      )}
                    </button>
                  </div>
                )
              })}
              {filteredAssets.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
                  No assets match your search.
                </p>
              )}
            </div>
          </div>
        ) : (
          <TextStudio value={textStyle} onChange={setTextStyle} />
        )}

        <DialogFooter className="items-center justify-between sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <InfoIcon className="size-3.5 shrink-0 text-blue-500" />
            Selected print method:{" "}
            <span className="font-medium text-foreground">Direct-to-Garment (DTG)</span> • Full
            CMYK color gamut supported.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={tab === "graphics" ? !pendingAssetId : !textStyle.value.trim()}
              onClick={() => {
                if (tab === "graphics" && pendingAssetId) onApplyGraphic(pendingAssetId)
                if (tab === "text" && textStyle.value.trim()) onApplyText(textStyle)
                onOpenChange(false)
              }}
            >
              {tab === "graphics" ? "Insert Graphic onto Print Zone" : "Insert Text onto Print Zone"} →
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const MM_PER_PX = 350 / 320

function fontScaleLabel(pt: number) {
  if (pt <= 20) return "Small"
  if (pt <= 35) return "Medium"
  if (pt <= 60) return "Large"
  return "XL"
}

const CANVAS_WIDTH = 320
const CANVAS_HEIGHT = 380

function drawArcLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  arcDegrees: number,
  letterSpacingPx: number,
  color: string,
  outline: boolean,
  outlineWidth: number
) {
  const totalAngle = (arcDegrees * Math.PI) / 180
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width + letterSpacingPx)
  const totalWidth = widths.reduce((a, b) => a + b, 0)
  const angleStep = totalWidth > 0 ? totalAngle / widths.length : 0
  const angle = -totalAngle / 2

  chars.forEach((ch, i) => {
    const charAngle = angle + angleStep * (i + 0.5)
    const x = centerX + radius * Math.sin(charAngle)
    const y = centerY - radius * Math.cos(charAngle)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(charAngle)
    if (outline) {
      ctx.lineWidth = outlineWidth
      ctx.strokeStyle = color
      ctx.strokeText(ch, 0, 0)
    }
    ctx.fillStyle = color
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  })

  return totalWidth
}

function drawFlatLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  letterSpacingPx: number,
  color: string,
  align: TextStyle["align"],
  outline: boolean,
  outlineWidth: number
) {
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width + letterSpacingPx)
  const totalWidth = widths.reduce((a, b) => a + b, 0)

  let startX = x
  if (align === "center") startX = x - totalWidth / 2
  if (align === "right" || align === "justify") startX = x - totalWidth

  let cursor = startX
  chars.forEach((ch, i) => {
    if (outline) {
      ctx.lineWidth = outlineWidth
      ctx.strokeStyle = color
      ctx.strokeText(ch, cursor, y)
    }
    ctx.fillStyle = color
    ctx.fillText(ch, cursor, y)
    cursor += widths[i]
  })

  return totalWidth
}

function TextStudio({ value, onChange }: { value: TextStyle; onChange: (style: TextStyle) => void }) {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [customHexOpen, setCustomHexOpen] = useState(false)

  useEffect(() => {
    const canvasEl = canvasElRef.current
    const ctx = canvasEl?.getContext("2d")
    if (!canvasEl || !ctx) return

    canvasEl.width = CANVAS_WIDTH
    canvasEl.height = CANVAS_HEIGHT
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const font = TEXT_FONTS.find((f) => f.id === value.fontId) ?? TEXT_FONTS[0]
    const weight = value.bold ? "700" : "400"
    const style = value.italic ? "italic" : "normal"
    ctx.font = `${style} ${weight} ${value.fontScale}px ${font.family}`
    ctx.textBaseline = "middle"

    const letterSpacingPx = value.letterSpacing * 4
    const displayText = value.uppercase ? value.value.toUpperCase() : value.value
    const lines = displayText.split("\n").filter((line) => line.length > 0)
    const lineHeight = value.fontScale * 1.15
    const centerX = CANVAS_WIDTH / 2
    const centerY = CANVAS_HEIGHT / 2 - 20

    let maxWidth = 0

    if (value.curvature > 0) {
      const radius = 420 - value.curvature * 2.2
      const arcDegrees = value.curvature * 0.9
      const joined = lines.join(" ")
      ctx.textAlign = "center"
      maxWidth = drawArcLine(
        ctx,
        joined,
        centerX,
        centerY - radius + lineHeight,
        radius,
        arcDegrees,
        letterSpacingPx,
        value.color,
        value.outline,
        value.outlineWidth
      )
    } else {
      const startY = centerY - ((lines.length - 1) * lineHeight) / 2
      lines.forEach((line, i) => {
        const width = drawFlatLine(
          ctx,
          line,
          centerX,
          startY + i * lineHeight,
          letterSpacingPx,
          value.color,
          value.align,
          value.outline,
          value.outlineWidth
        )
        maxWidth = Math.max(maxWidth, width)
      })
    }

    if (value.underline && value.curvature === 0) {
      const underlineY = centerY - ((lines.length - 1) * lineHeight) / 2 + (lines.length - 1) * lineHeight + value.fontScale * 0.35
      ctx.strokeStyle = value.color
      ctx.lineWidth = Math.max(1, value.fontScale / 20)
      ctx.beginPath()
      ctx.moveTo(centerX - maxWidth / 2, underlineY)
      ctx.lineTo(centerX + maxWidth / 2, underlineY)
      ctx.stroke()
    }

    ctx.font = `600 12px ${font.family}`
    ctx.fillStyle = "rgba(255,255,255,0.85)"
    ctx.textAlign = "center"
    let subCursor = centerX - ctx.measureText(value.subtitle).width / 2
    ;[...value.subtitle].forEach((ch) => {
      ctx.fillText(ch, subCursor + ctx.measureText(ch).width / 2, centerY + 90)
      subCursor += ctx.measureText(ch).width + 1.5
    })

    setDimensions({
      width: Math.round(maxWidth * MM_PER_PX),
      height: Math.round(lines.length * lineHeight * MM_PER_PX),
    })
  }, [value])

  function set<K extends keyof TextStyle>(key: K, val: TextStyle[K]) {
    onChange({ ...value, [key]: val })
  }

  const alignOptions: { id: TextStyle["align"]; icon: LucideIcon }[] = [
    { id: "left", icon: AlignLeft },
    { id: "center", icon: AlignCenter },
    { id: "right", icon: AlignRight },
    { id: "justify", icon: AlignJustify },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              1. TYPOGRAPHY ENGINE (POPULAR APPAREL FONTS)
            </p>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              100+ Free Commercial Fonts
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEXT_FONTS.map((font) => {
              const active = font.id === value.fontId
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => set("fontId", font.id)}
                  className={cn(
                    "relative rounded-lg border p-3 text-left transition-colors",
                    active ? "border-destructive bg-destructive/5" : "border-border hover:bg-muted"
                  )}
                >
                  {active && (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-destructive text-white">
                      <CheckIcon className="size-3" />
                    </span>
                  )}
                  <p className="text-lg font-bold" style={{ fontFamily: font.cssVar }}>
                    {font.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{font.sublabel}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
            2. DIMENSIONS &amp; LETTERING LAYOUT
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Font Scale:</span>
                <span className="font-mono font-medium">
                  {value.fontScale} pt ({fontScaleLabel(value.fontScale)})
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={96}
                value={value.fontScale}
                onChange={(e) => set("fontScale", Number(e.target.value))}
                className="w-full accent-destructive"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Letter Spacing:</span>
                <span className="font-mono font-medium">
                  {value.letterSpacing > 0 ? "+" : ""}
                  {value.letterSpacing} mm
                </span>
              </div>
              <input
                type="range"
                min={-5}
                max={15}
                step={0.5}
                value={value.letterSpacing}
                onChange={(e) => set("letterSpacing", Number(e.target.value))}
                className="w-full accent-destructive"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 rounded-lg border border-border p-1">
              {alignOptions.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => set("align", id)}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md transition-colors",
                    value.align === id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-1">
              <button
                type="button"
                onClick={() => set("bold", !value.bold)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.bold ? "bg-destructive text-white" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Bold className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("italic", !value.italic)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.italic ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Italic className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("uppercase", !value.uppercase)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.uppercase ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <CaseSensitive className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("underline", !value.underline)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.underline ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Underline className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              3. APPAREL CURVATURE &amp; SPECIAL EFFECTS
            </p>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Screenprint Ready
            </span>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Collar Arch / Arc:</span>
              <span className="font-mono font-medium">
                {value.curvature}% ({value.curvature === 0 ? "Flat" : "Curved"})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={value.curvature}
              onChange={(e) => set("curvature", Number(e.target.value))}
              className="w-full accent-destructive"
            />
          </div>
          <label className="mt-3 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value.outline}
                onChange={(e) => set("outline", e.target.checked)}
                className="size-4 accent-destructive"
              />
              Outline Stroke
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <input
                type="number"
                min={0.5}
                max={6}
                step={0.5}
                disabled={!value.outline}
                value={value.outlineWidth}
                onChange={(e) => set("outlineWidth", Number(e.target.value))}
                className="h-6 w-14 rounded border border-input bg-transparent px-1 text-right outline-none disabled:opacity-50"
              />
              mm
            </span>
          </label>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              4. PIGMENT &amp; THREAD INK TONE
            </p>
            <span className="font-mono text-[11px] text-muted-foreground">
              HEX: {value.color.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {INK_TONES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => set("color", hex)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border transition-shadow",
                  value.color.toUpperCase() === hex
                    ? "border-destructive ring-2 ring-offset-1 ring-destructive/50"
                    : "border-border"
                )}
                style={{ backgroundColor: hex }}
              >
                {value.color.toUpperCase() === hex && (
                  <CheckIcon
                    className="size-3.5"
                    style={{ color: isLightColor(hex) ? "#111" : "#fff" }}
                  />
                )}
              </button>
            ))}
            <label className="relative flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
              <Pipette className="size-3.5" />
              Custom
              <input
                type="color"
                value={value.color}
                onChange={(e) => set("color", e.target.value)}
                onFocus={() => setCustomHexOpen(true)}
                onBlur={() => setCustomHexOpen(false)}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </label>
            {customHexOpen && (
              <span className="text-[11px] text-muted-foreground">Pick a colour…</span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-slate-900 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            LIVE PREVIEW
          </span>
          <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px]">
            100% Combed Cotton Texture
          </span>
        </div>
        <div className="relative overflow-hidden rounded-md bg-slate-950/60">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-destructive/30" />
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-destructive/30" />
          <canvas ref={canvasElRef} className="block w-full" />
        </div>
        <div className="mt-3 space-y-2">
          <textarea
            value={value.value}
            onChange={(e) => set("value", e.target.value)}
            placeholder="Type your text… (use a new line for a second row)"
            rows={2}
            className="w-full rounded-md border border-white/15 bg-white/5 p-2 text-center text-sm text-white outline-none placeholder:text-white/40 focus-visible:border-white/30"
          />
          <div className="flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] text-white">
              <TypeIcon className="size-3 text-destructive" />
              {dimensions.width} mm × {dimensions.height} mm
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
