import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Garment } from "@/app/(public)/shop/_data";

function getBadge(tags: string[]): string | null {
  if (tags.includes("new")) return "NEW";
  if (tags.includes("bestseller")) return "HOT";
  if (tags.includes("top-seller")) return "TOP";
  return null;
}

export function GarmentExploreCard({ garment }: { garment: Garment }) {
  const image = garment.images[0];
  const badge = getBadge(garment.tags);
  const discount =
    garment.compareAtPrice && garment.compareAtPrice > garment.price
      ? Math.round((1 - garment.price / garment.compareAtPrice) * 100)
      : null;

  return (
    <div className="flex flex-col">
      <Link
        href={`/shop/${garment.slug}`}
        className="group relative block aspect-square overflow-hidden rounded-md bg-[#F5F5F5]"
      >
        {badge && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-black px-2 py-0.5 text-[10px] font-semibold text-white">
            {badge}
          </span>
        )}
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </Link>

      <p className="mt-3 text-[11px] font-medium tracking-wide text-[#9CA3AF] uppercase">
        {garment.category}
      </p>
      <Link
        href={`/shop/${garment.slug}`}
        className="text-sm font-medium text-[#111827] hover:text-[#DC2626]"
      >
        {garment.name}
      </Link>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-bold text-[#DC2626]">${garment.price.toFixed(2)}</span>
        {garment.compareAtPrice && (
          <span className="text-xs text-gray-400 line-through">
            ${garment.compareAtPrice.toFixed(2)}
          </span>
        )}
        {discount !== null && (
          <span className="text-xs font-medium text-[#16A34A]">-{discount}%</span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {garment.colors.slice(0, 4).map((color) => (
            <span
              key={color.id}
              className="size-3 rounded-full border border-gray-200"
              style={{ backgroundColor: color.swatch }}
              title={color.name}
            />
          ))}
          {garment.colors.length > 4 && (
            <span className="text-[10px] text-gray-400">+{garment.colors.length - 4}</span>
          )}
        </div>

        <Link
          href={`/shop/${garment.slug}/design`}
          className="flex items-center gap-1 text-xs font-semibold text-[#DC2626] hover:underline"
        >
          Design Now <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
