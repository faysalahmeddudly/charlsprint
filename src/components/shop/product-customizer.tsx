"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  CheckIcon,
  ChevronDownIcon,
  Focus,
  Minus,
  PaletteIcon,
  PlusIcon,
  Shirt,
  TypeIcon,
} from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { EmbroideryIcon } from "@/components/icons/embroidery-icon";
import type { Garment } from "@/app/(public)/create-design/_data";
import {
  currency,
  VISIBLE_COLOR_COUNT,
  SURFACE_CARD,
  ZONE_ICONS,
  isLightColor,
  GRAPHIC_ASSETS,
  TEXT_FONTS,
  type ZoneContent,
} from "./product-customizer.constants";
import { ColorPickerDialog } from "./color-picker-dialog";
import { GraphicsLibraryDialog } from "./graphics-library-dialog";

export function ProductCustomizer({
  garment,
  initialColorId,
  initialTierId,
}: {
  garment: Garment;
  initialColorId?: string;
  initialTierId?: string;
}) {
  const [activeZone, setActiveZone] = useState(garment.printZones[0]?.id);
  const [tierId, setTierId] = useState(
    garment.pricingTiers.find((t) => t.id === initialTierId)?.id ??
      garment.pricingTiers[0]?.id,
  );
  const [colorId, setColorId] = useState(
    garment.colors.find((c) => c.id === initialColorId)?.id ??
      garment.colors[0]?.id,
  );
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(garment.sizes.map((size) => [size.id, size.defaultQty])),
  );
  const [zoneContent, setZoneContent] = useState<Record<string, ZoneContent>>(
    () =>
      Object.fromEntries(
        garment.printZones.map((zone) => [
          zone.id,
          zone.status === "Applied"
            ? { type: "graphic", assetId: "skull" }
            : undefined,
        ]),
      ),
  );
  const [graphicsModalOpen, setGraphicsModalOpen] = useState(false);
  const [graphicsModalTab, setGraphicsModalTab] = useState<"graphics" | "text">(
    "graphics",
  );
  const [zoom, setZoom] = useState(100);
  const [inspect3D, setInspect3D] = useState(false);

  function zoomBy(delta: number) {
    setZoom((prev) => Math.min(200, Math.max(50, prev + delta)));
  }

  const tier =
    garment.pricingTiers.find((t) => t.id === tierId) ??
    garment.pricingTiers[0];
  const image = garment.images[0];

  const totalUnits = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities],
  );

  const subtotal = totalUnits * garment.basePricePerUnit;
  const discount = subtotal * tier.discountRate;
  const total = subtotal - discount;
  const perUnit = totalUnits > 0 ? total / totalUnits : 0;

  function setQty(sizeId: string, value: number) {
    setQuantities((prev) => ({ ...prev, [sizeId]: Math.max(0, value) }));
  }

  return (
    <div className="max-w-[1216px] mx-auto">
    <div className="mx-auto grid grid-cols-[1fr_426.67px] gap-3.5">
      {/* preview shirt  */}
      <div className="max-w-233 min-w-0 space-y-[34px]">
        <div className="flex flex-nowrap gap-2 bg-white px-6 py-1 shadow-sm">
          {garment.printZones.map((zone) => {
            const applied = Boolean(zoneContent[zone.id]);
            const Icon = ZONE_ICONS[zone.id] ?? Shirt;
            const active = zone.id === activeZone;
            return (
              <Button
                key={zone.id}
                type="button"
                variant="ghost"
                onClick={() => setActiveZone(zone.id)}
                className={cn(
                  "h-auto min-w-0 flex-1 justify-between rounded px-3 py-2 text-left text-sm font-normal transition-colors",
                  active ? "gap-[9px]" : "gap-1",
                  active
                    ? "border-transparent bg-destructive text-white shadow-sm hover:bg-destructive"
                    : "border-border bg-card-secondary hover:bg-muted",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      zone.id === "right-sleeve" && "-scale-x-100",
                      active ? "text-white" : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "truncate font-inter text-[13px] font-semibold leading-4 tracking-[0.13px]",
                      active ? "text-white" : "text-[#0B1C30]",
                    )}
                  >
                    {zone.label}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-0.5 font-inter text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-center",
                    active
                      ? "bg-white/20 text-white"
                      : applied
                        ? "bg-destructive text-white"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {applied ? "1 Applied" : "Empty"}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-lg  bg-muted/40 p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="rounded bg-background/80 px-2 py-1 shadow-sm">
              Center Offset: X: 0.00 mm | Y: -45.2 mm
            </span>
            <span className="rounded bg-background/80 px-2 py-1 shadow-sm">
              Print Window: 350 × 450 mm (Max DTG)
            </span>
          </div>

          <div
            className="relative mx-auto aspect-square w-full transition-transform duration-200"
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
                const content = zoneContent["front-chest"];
                if (!content) return null;
                const asset =
                  content.type === "graphic"
                    ? GRAPHIC_ASSETS.find((a) => a.id === content.assetId)
                    : undefined;
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
                          style={{
                            transform: `skewY(${(content.curvature / 100) * -6}deg)`,
                          }}
                        >
                          <p
                            className="break-words text-sm sm:text-base"
                            style={{
                              fontFamily: TEXT_FONTS.find(
                                (f) => f.id === content.fontId,
                              )?.cssVar,
                              fontWeight: content.bold ? 700 : 400,
                              fontStyle: content.italic ? "italic" : "normal",
                              textDecoration: content.underline
                                ? "underline"
                                : "none",
                              textTransform: content.uppercase
                                ? "uppercase"
                                : "none",
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
                );
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
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
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

      {/* sidebar  */}

      <div className="max-w-[426.67px] space-y-3">


        
        <section className={`${SURFACE_CARD} space-y-2`}>
          <div className=" flex items-center justify-between">
            <p className="font-plus-jakarta-sans text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION A // GARMENT MODEL
            </p>

            <span className="flex items-center gap-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006947]">
              <span className="size-1.5 rounded-full bg-[#006947]" />
              In Stock ({garment.stockCount.toLocaleString()} pcs)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[68px] h-[76px] border border-[#000116] rounded-md shrink-0 overflow-hidden bg-muted">
              {image && (
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={68}
                  height={76}
                  className="size-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base leading-6 font-semibold tracking-[-0.16px] text-[#0B1C30] font-plus-jakarta-sans">
                {garment.name}
              </p>

              <p className="text-xs leading-[18px] font-normal text-[#565E74]">
                {garment.fabric} • {garment.fit}
              </p>

              <p className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-[#DC2626]">
                SKU: {garment.sku}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-[4.01px] rounded-sm border-none bg-[#E5EEFF] px-2 py-1 hover:bg-[#E5EEFF]/80 text-[13px] leading-4 font-semibold tracking-[0.13px] text-[#0B1C30]"
            >
              Change
              <ChevronDownIcon />
            </Button>
          </div>
        </section>

        <section className={`${SURFACE_CARD} space-y-2`}>
          <div className="flex items-center justify-between">
            <p className="font-plus-jakarta-sans text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION C // GARMENT HUE
            </p>

            {garment.colors.length > VISIBLE_COLOR_COUNT && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setColorModalOpen(true)}
                className=" border-none bg-transparent  text-base  font-semibold tracking-[-0.16px] text-[#DC2626] hover:bg-transparent/70 font-plus-jakarta-sans"
              >
                See More
              </Button>
            )}
          </div>

          <div className="flex justify-between flex-nowrap gap-2 overflow-hidden">
            {garment.colors.slice(0, VISIBLE_COLOR_COUNT).map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.name}
                onClick={() => setColorId(color.id)}
                className={cn(
                  "flex size-[42px] shrink-0 items-center justify-center rounded-xl border shadow-[0_1px_2px_0_#0000000D] transition-shadow",
                  color.id === colorId ? "border-foreground" : "border-border",
                )}
                style={{ backgroundColor: color.swatch }}
              >
                {color.id === colorId && (
                  <CheckIcon
                    className="size-4"
                    style={{
                      color: isLightColor(color.swatch) ? "#111" : "#fff",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className={`${SURFACE_CARD} space-y-2`}>
          <div className="mb-3 flex items-center justify-between">
            <p className="font-plus-jakarta-sans text-xs font-semibold tracking-wide text-muted-foreground">
              SELECT VECTOR &amp; GRAPHICS ASSETS
            </p>

            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 14.2875L0 9.0375L1.2375 8.1L6.75 12.375L12.2625 8.1L13.5 9.0375L6.75 14.2875ZM6.75 10.5L0 5.25L6.75 0L13.5 5.25L6.75 10.5ZM6.75 8.5875L11.0625 5.25L6.75 1.9125L2.4375 5.25L6.75 8.5875Z"
                fill="#565E74"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <div className="pt-1 pb-1">
              <button
                type="button"
                onClick={() => {
                  setGraphicsModalTab("graphics");
                  setGraphicsModalOpen(true);
                }}
                className="flex w-full flex-col items-center justify-center gap-3 rounded bg-background py-[18px] text-center text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-destructive shadow-[0_1px_2px_0_#0000000D] transition-colors hover:bg-background/70"
              >
                <PaletteIcon className="size-5" />
                Graphics
              </button>
            </div>

            <div className="pt-1 pb-1">
              <button
                type="button"
                onClick={() => {
                  setGraphicsModalTab("graphics");
                  setGraphicsModalOpen(true);
                }}
                className="flex w-full flex-col items-center justify-center gap-3 rounded bg-background py-[18px] text-center text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-[#000000] shadow-[0_1px_2px_0_#0000000D] transition-colors hover:bg-background/70"
              >
                <EmbroideryIcon className="size-5" />
                Embroidery Design
              </button>
            </div>

            <div className="pt-1 pb-1">
              <button
                type="button"
                onClick={() => {
                  setGraphicsModalTab("text");
                  setGraphicsModalOpen(true);
                }}
                className="flex w-full flex-col items-center justify-center gap-3 rounded bg-background py-[18px] text-center text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-foreground shadow-[0_1px_2px_0_#0000000D] transition-colors hover:bg-background/70"
              >
                <TypeIcon className="size-5" />
                Text
              </button>
            </div>
          </div>
        </section>

        <section className={`${SURFACE_CARD} space-y-2`}>
          <div className="mb-3 flex items-center  justify-between">
            <p className="font-plus-jakarta-sans text-xs font-semibold tracking-wide text-muted-foreground">
              SECTION B // SIZE DISTRIBUTION
            </p>
          </div>

          <div className="grid  grid-cols-3 gap-2">
            {garment.pricingTiers.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                className={cn(
                  "h-[47px] rounded-[2px] px-2 py-1 text-[11px] leading-[14px] font-semibold tracking-[0.44px] transition-colors flex items-center justify-center",
                  t.id === tier.id
                    ? "bg-destructive text-white shadow-[0_1px_2px_0_#0000000D]"
                    : "bg-[#E5EEFF] text-[#0B1C30] hover:bg-[#E5EEFF]/70",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {garment.sizes.map((size) => (
              <div key={size.id} className="space-y-1 text-center">
                <p className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-muted-foreground">
                  {size.label}
                </p>
                <input
                  type="number"
                  min={0}
                  value={quantities[size.id]}
                  onChange={(e) => setQty(size.id, Number(e.target.value))}
                  className=" w-full py-[7.5px] rounded-[2px]  bg-white text-center text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            ))}
          </div>

          <div className=" flex items-center justify-between  pt-3">
            <span className="text-xs text-muted-foreground">
              Aggregate Batch Run:
            </span>

            <span className="text-2xl font-extrabold text-[#DC2626]">
              {totalUnits}{" "}
              <span className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-muted-foreground uppercase">
                units total
              </span>
            </span>
          </div>
        </section>

        <section className={`${SURFACE_CARD} space-y-2`}>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Garment Base ({totalUnits} pcs)
              </span>

              <p className="text-[13px] leading-4 font-semibold tracking-[0.13px] text-[#0B1C30] font-inter">
                $1,555.00
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Front Print (Full Color DTG)
              </span>
              <p className="text-[13px] leading-4 font-semibold tracking-[0.13px] text-[#0B1C30] ">
                Included
              </p>
            </div>

            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-[13px] leading-4 font-semibold tracking-[0.13px] text-[#007642] font-inter">
                Discount
              </span>
              <span className="text-base leading-4 font-semibold tracking-[0.13px] text-[#007642] font-inter">
                -{currency(discount)}
              </span>
            </div>

          </div>

          <div className="mt-3 flex items-end justify-between  pt-3">
            <div>
              <p className="text-xs text-muted-foreground">
                Total (ex. shipping):
              </p>
              <p className="text-[11px] text-muted-foreground">
                USD ({currency(perUnit)} / unit)
              </p>
            </div>
            <p className="text-2xl font-bold text-destructive">
              {currency(total)}
            </p>
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
          setZoneContent((prev) => ({
            ...prev,
            [activeZone]: { type: "graphic", assetId },
          }))
        }
        onApplyText={(style) =>
          activeZone &&
          setZoneContent((prev) => ({
            ...prev,
            [activeZone]: { type: "text", ...style },
          }))
        }
      />
    </div>

    </div>
  );
}
