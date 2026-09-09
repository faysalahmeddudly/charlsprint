import Link from "next/link";
import React from "react";
import { ChevronRight, Clock4 } from "lucide-react";

export default function ProperCustomAperal() {
  const buttonColor = [
    { id: 1, hex: "#059669", tag: "BESTSELLER  " },
    { id: 2, hex: "#DC2626", tag: "-30% BULK " },
    { id: 3, hex: "#1E293B", tag: "RETAIL CUT " },
    { id: 4, hex: "#4F46E5 ", tag: "EMBROIDERY " },
    { id: 5, hex: "#D97706", tag: "ECO CANVAS" },
  ];

  const popularSellerProductData = [
    {
      id: 1,
      url: "/1popular.jpg",
      badge: "BESTSELLER",
      brand: "AS COLOUR",
      title: "AS Colour 5001 Staple Tee",
      short_description: "",
      price: "$14.50",
      compare_price: "$19.90",
      discount: "-25%",
    },
    {
      id: 2,
      url: "/2popular.jpg",
      badge: "-30% BULK",
      brand: "GILDAN 18500",
      title: "Heavy Blend Hooded Sweat",
      short_description: "",
      price: "$28.90",
      compare_price: "$39.90",
      discount: "-30%",
    },
    {
      id: 3,
      url: "/3popular.jpg",
      badge: "RETAIL CUT",
      brand: "RAMO COLLECTION",
      title: "Premium 100% Cotton Crew",
      short_description: "",
      price: "$12.60",
      compare_price: "$16.20",
      discount: "-22%",
    },
    {
      id: 4,
      url: "/4popular.jpg",
      badge: "EMBROIDERY",
      brand: "AS COLOUR",
      title: "AS Colour Surf Cap 1114",
      short_description: "",
      price: "$16.20",
      compare_price: "$20.90",
      discount: "-20%",
    },
    {
      id: 5,
      url: "/5popular.jpg",
      badge: "ECO CANVAS",
      brand: "PRINT/LOCKER MERCH",
      title: "Heavy Canvas Merch Tote",
      short_description: "",
      price: "$8.50",
      compare_price: "$12.00",
      discount: "-25%",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] border-t border-b py-10 border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-8  ">
        {/* header */}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl tracking-[-0.6px] text-[#0F172A]">
                POPULAR CUSTOM APPAREL
              </h1>

              <div className="pl-4">
                <button className="bg-[#FEF3C7] flex items-center gap-1 border border-[#FCD34D] py-1 px-2.5 rounded-full">
                  <div>
                    <Clock4 color="#D97706" size={14} />
                  </div>{" "}
                  <span className="pl-[6px]">
                    {" "}
                    Lead Time: 3-5 Business Days
                  </span>
                </button>
              </div>
            </div>

            <div>
              <Link href={""}>
                <button className="flex items-center gap-1 text-[#DC2626] tracking-[0.3px]">
                  BROWSE ALL PRODUCTS
                  <ChevronRight />
                </button>
              </Link>
            </div>
          </div>

          <div className="text-xs text-[#64748B]">
            Get them printed before they&lsquo;re gone! High quality blank stock
            ready in Melbourne.
          </div>
        </div>

        {/* product card */}

        <div className="flex justify-between itms-center">
          {popularSellerProductData.map((product) => (
            <div key={product.id} className=""></div>
          ))}
        </div>
      </div>
    </div>
  );
}
