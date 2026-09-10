"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, ShoppingBagIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ColorPickerDialog } from "@/components/shop/color-picker-dialog";
import {
  currency,
  isLightColor,
  VISIBLE_COLOR_COUNT,
  SURFACE_CARD as CUSTOMIZER_SURFACE_CARD,
} from "@/components/shop/product-customizer.constants";
import type { Garment } from "@/app/(public)/create-design/_data";

const SURFACE_CARD = "rounded-lg bg-card-secondary p-3";

export function ProductDetails({ garment }: { garment: Garment }) {
  const { addItem } = useCart();
  const [activeImageId, setActiveImageId] = useState("1");
  const [tierId, setTierId] = useState(garment.pricingTiers[0]?.id);
  const [colorId, setColorId] = useState(garment.colors[0]?.id);
  const [colorModalOpen, setColorModalOpen] = useState(false);

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(garment.sizes.map((size) => [size.id, size.defaultQty])),
  );

  const [justAdded, setJustAdded] = useState(false);

  const tier =
    garment.pricingTiers.find((t) => t.id === tierId) ??
    garment.pricingTiers[0];
  const activeColor =
    garment.colors.find((c) => c.id === colorId) ?? garment.colors[0];
  const activeImage =
    garment.images.find((image) => image.id === activeImageId) ??
    garment.images[0];

  const totalUnits = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities],
  );

  const discountPercent =
    garment.compareAtPrice && garment.compareAtPrice > garment.price
      ? Math.round((1 - garment.price / garment.compareAtPrice) * 100)
      : undefined;

  function setQty(sizeId: string, value: number) {
    setQuantities((prev) => ({ ...prev, [sizeId]: Math.max(0, value) }));
  }

  function handleAddToCart() {
    if (totalUnits === 0 || !activeImage) return;
    addItem({
      productId: garment.id,
      variantId: activeColor?.id,
      name: garment.name,
      image: activeImage.url,
      price: garment.price,
      quantity: totalUnits,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  const designHref = `/create-design/${garment?.id}/design${
    colorId || tierId
      ? `?${new URLSearchParams({
          ...(colorId ? { color: colorId } : {}),
          ...(tierId ? { tier: tierId } : {}),
        }).toString()}`
      : ""
  }`;

  return (
    <div className="space-y-10 mt-[50px] mb-[150px] max-w-[1240px] mx-auto">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* image div */}

        <div className="flex flex-col gap-[25px]">
          <div className="relative aspect-[137/105] overflow-hidden rounded-[22px] border border-[#E5E5E5] ">
            {activeImage && (
              <Image
                src={activeImage?.url}
                alt={activeImage?.alt}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* for orginally use but now i make the image if garment.images.length > 1 && but still now i make it statically */}
          {
            <div className="flex flex-wrap gap-2">
              {[{ id: 1 }, { id: 2 }, { id: 3 }].map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImageId(String(image.id))}
                  className={cn(
                    "relative size-16 shrink-0 overflow-hidden rounded-md border-2 bg-muted/40",
                    String(image.id) === activeImageId
                      ? "border-destructive"
                      : "border-transparent",
                  )}
                >
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          }
        </div>

        {/* details container & action button  */}
        <div className="space-y-[30px]">



          {/* name & price */}
          <div className="flex flex-col gap-[10px]">
           
              <h1 className="font-rubik text-2xl leading-none font-semibold tracking-normal text-[#000116]">
                {garment.name}
              </h1>
              
            
            <h2 className="font-rubik text-[32px] leading-none font-semibold tracking-normal text-[#EF252C]">
                {currency(garment.price)}
              </h2>

            <div className="flex items-baseline gap-2">

              {discountPercent !== undefined && garment.compareAtPrice && (
                <>
                  <span className="font-rubik text-base leading-none font-normal tracking-normal text-[#636363] line-through">
                    {currency(garment.compareAtPrice)}
                  </span>
                  <span className="font-rubik text-base leading-none font-bold tracking-normal text-[#636363]">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>
          </div>



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

          <section className={`${CUSTOMIZER_SURFACE_CARD} space-y-2`}>
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

            <div className="grid grid-cols-8 gap-2">
              {garment.colors.map((color) => (
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

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-3 rounded-[4px] border-[#EF252C] px-8 py-4 text-[#EF252C] hover:bg-[#EF252C]/5"
              disabled={totalUnits === 0}
              onClick={handleAddToCart}
            >
              <ShoppingBagIcon />
              {justAdded ? "Added ✓" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              className="flex-1 gap-3 rounded-[4px] bg-destructive px-8 py-4 text-white hover:bg-destructive/90"
              nativeButton={false}
              render={<Link href={designHref} />}
            >
              Start Design
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* all sizes  */}

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
                  <td className="px-3 py-2 text-muted-foreground">
                    {row.length}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {row.width}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {row.sleeve}
                  </td>
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
  );
}
