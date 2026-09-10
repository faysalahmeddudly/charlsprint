import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function hexToRgba(hex: string, opacityPercent: number) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
}

export default function ShopCategory() {
  const rowCategories = [
    {
      id: 1,
      bg: "#FFCECE",
      opacity: "50",
      alt: "charles Print",
      url: "/shirt.png",
      title: "Man T-Shirt",
    },
    {
      id: 2,
      bg: "#E5FFCE",
      opacity: "50",
      alt: "charles Print",
      url: "/shirt.png",
      title: "Man T-Shirt",
    },
    {
      id: 3,
      bg: "#CEDCFF",
      opacity: "50",
      alt: "charles Print",
      url: "/shirt.png",
      title: "Man T-Shirt",
    },
    {
      id: 4,
      bg: "#EACEFF",
      opacity: "50",
      alt: "charles Print",
      url: "/shirt.png",
      title: "Man T-Shirt",
    },
    {
      id: 5,
      bg: "#CEFCFF",
      opacity: "50",
      alt: "charles Print",
      url: "/shirt.png",
      title: "Man T-Shirt",
    },
  ];

  const categories = rowCategories.slice(0, 6);

  return (
    <div className="max-w-[1280px] mt-14 mb-[18px] mx-auto flex flex-col gap-6 px-8">
      {/* shop category header  */}
      <div className="flex items-center justify-between">
        <h1 className="font-dm-sans text-2xl font-bold tracking-[-0.6px] text-[#111827]">
          Shop by 
          Category
        </h1>

        <Link
          href="/categories"
          className="flex items-center gap-1 cursor-pointer group font-dm-sans"
        >
          <span className="text-[#EF4444] text-xs  font-bold group-hover:underline">
            All Categories
          </span>
          <ChevronRight color="#EF4444" size={14} />
        </Link>
      </div>

      {/* card container div */}

      <div className="flex items-center justify-center gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="pt-6 px-4 pb-2 rounded-2xl"
            style={{ backgroundColor: hexToRgba(cat.bg, Number(cat.opacity)) }}
          >
            <div className="flex flex-col gap-4">
              <div className="text-2xl tracking-[-0.6px]">{cat.title}</div>

              <div className="max-w-[250px] max-h-[250px]">
                <img src={cat.url} alt={cat?.alt || "category image"} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
