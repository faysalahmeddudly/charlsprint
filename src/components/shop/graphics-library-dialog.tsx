"use client"

import { useState } from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  InfoIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  TypeIcon,
  UploadCloudIcon,
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
import {
  GRAPHIC_ASSETS,
  GRAPHIC_CATEGORIES,
  type TextStyle,
  type ZoneContent,
  DEFAULT_TEXT_STYLE,
} from "./product-customizer.constants"
import { TextStudio } from "./text-studio"

export function GraphicsLibraryDialog({
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
