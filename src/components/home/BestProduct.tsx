import React from "react";
import Link from "next/link";
import ProductCardSm, { ProductHome } from "../shared/ProductCardSm";
import {ArrowDown } from 'lucide-react'

export default function BestProduct() {
  const productData: ProductHome[] = [
    {
      id: 1,
      image: "/shirt.png",
      badge: "NEW",
      brand: "AS COLOUR 5080",
      title: "Heavy Tee – Box Fit 280GSM",
      price: "$18.90",
      compare_price: "$24.00",
      discount: "-21%",
      available_color: [
        { id: 1, hex: "#000000" },
        { id: 2, hex: "#64748B" },
        { id: 3, hex: "#D1D5DB" },
        { id: 4, hex: "#059669" },
      ],
    },
    {
      id: 2,
      image: "/shirt.png",
      badge: "NEW",
      brand: "PREMIUM TERRY",
      title: "French Terry Raglan Crew",
      price: "$34.50",
      compare_price: "$42.00",
      discount: "-18%",
      available_color: [
        { id: 1, hex: "#000000" },
        { id: 2, hex: "#2563EB" },
        { id: 3, hex: "#F3F4F6" },
      ],
    },
    {
      id: 3,
      image: "/shirt.png",
      badge: "NEW",
      brand: "FLEXFIT / YUPOONG",
      title: "Classic Retro Trucker Snapback",
      price: "$14.20",
      compare_price: "$18.00",
      discount: "-21%",
      available_color: [
        { id: 1, hex: "#000000" },
        { id: 2, hex: "#F3F4F6" },
        { id: 3, hex: "#D97706" },
      ],
    },
    {
      id: 4,
      image: "/shirt.png",
      badge: "NEW",
      brand: "STANLEY/STELLA",
      title: "100% Organic Creator Tee",
      price: "$17.50",
      compare_price: "$22.00",
      discount: "-20%",
      available_color: [
        { id: 1, hex: "#D1D5DB" },
        { id: 2, hex: "#059669" },
        { id: 3, hex: "#F472B6" },
      ],
    },
    {
      id: 5,
      image: "/shirt.png",
      badge: "HOT",
      brand: "ECO MERCH",
      title: "AS Colour Carrie Tote 1001",
      price: "$9.20",
      compare_price: "$13.50",
      discount: "-31%",
      available_color: [
        { id: 1, hex: "#FDE68A" },
        { id: 2, hex: "#000000" },
      ],
    },
    {
      id: 6,
      image: "/shirt.png",
      badge: "NEW",
      brand: "STREETWEAR COLLECTION",
      title: "Vintage Mineral Wash Tee",
      price: "$21.50",
      compare_price: "$28.00",
      discount: "-23%",
      available_color: [
        { id: 1, hex: "#64748B" },
        { id: 2, hex: "#78350F" },
      ],
    },
    {
      id: 7,
      image: "/shirt.png",
      badge: "NEW",
      brand: "OUTERWEAR",
      title: "Lightweight Packable Jacket",
      price: "$44.90",
      compare_price: "$58.00",
      discount: "-22%",
      available_color: [
        { id: 1, hex: "#000000" },
        { id: 2, hex: "#D97706" },
        { id: 3, hex: "#2563EB" },
      ],
    },
    {
      id: 8,
      image: "/shirt.png",
      badge: "TOP",
      brand: "AS COLOUR 5009",
      title: "Base Long Sleeve Cotton Tee",
      price: "$19.50",
      compare_price: "$25.00",
      discount: "-22%",
      available_color: [
        { id: 1, hex: "#000000" },
        { id: 2, hex: "#F3F4F6" },
        { id: 3, hex: "#64748B" },
      ],
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-8 py-14">
      {/*section heading heading */}

      <div className="flex text-center justify-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl  text-[#0F172A] tracking-[-0.75px] uppercase">
            Explore best collection
          </h1>

          <h1 className="pb-2 font-dm-sans text-[#64748B] text-[xs]">
            Retail blanks meticulously prepared for Direct-to-Garment (DTG),
            Screen Print & Embroidery
          </h1>

          <div className="bg-[#DC2626] w-10 h-1 self-center rounded"> </div>
        </div>
      </div>

      {/* product card */}

      <div className="grid grid-cols-4 gap-6 mt-10">
        {productData.map((product) => {
          return (
            <Link href="/create-design/as-colour-5001-staple" key={product.id}>
              <ProductCardSm product={product} />
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/create-design"
          className="flex items-center justify-center gap-1 rounded-full border border-[#CBD5E1] px-6 py-2.5 font-dm-sans text-xs font-bold text-[#1E293B]"
        >
          Browse More Garments
          <ArrowDown color="#1E293B" size={16} />
        </Link>
      </div>
    </section>
  );
}
