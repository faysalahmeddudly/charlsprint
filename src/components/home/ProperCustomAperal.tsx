import Link from "next/link";
import React from "react";
import { ChevronRight, Clock4 } from "lucide-react";

export default function ProperCustomAperal() {
  const popularSellerProductData = [
    {
      id: 1,
      url: "/1popular.jpg",
      badge: "BESTSELLER",
      badgeColor: "#059669",
      brand: "AS COLOUR",
      title: "AS Colour 5001 Staple Tee",
  
      price: "$14.50",
      compare_price: "$19.90",
      discount: "-25%",
    },
    {
      id: 2,
      url: "/2popular.jpg",
      badge: "-30% BULK",
      badgeColor: "#DC2626",
      brand: "GILDAN 18500",
      title: "Heavy Blend Hooded Sweat",
      
      price: "$28.90",
      compare_price: "$39.90",
      discount: "-30%",
    },
    {
      id: 3,
      url: "/3popular.jpg",
      badge: "RETAIL CUT",
      badgeColor: "#1E293B",
      brand: "RAMO COLLECTION",
      title: "Premium 100% Cotton Crew",
     
      price: "$12.60",
      compare_price: "$16.20",
      discount: "-22%",
    },
    {
      id: 4,
      url: "/1popular.jpg",
      badge: "EMBROIDERY",
      badgeColor: "#4F46E5",
      brand: "AS COLOUR",
      title: "AS Colour Surf Cap 1114",
      
      price: "$16.20",
      compare_price: "$20.90",
      discount: "-20%",
    },
    {
      id: 5,
      url: "/5popular.jpg",
      badge: "ECO CANVAS",
      badgeColor: "#D97706",
      brand: "PRINT/LOCKER MERCH",
      title: "Heavy Canvas Merch Tote",
    
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

        <div className="flex font-dm-sans pt-8 gap-4  justify-between items-center">
          {popularSellerProductData.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF] border p-3 border-[#E2E8F0] rounded-md"
            >
              {/* image container  */}
              <div className="flex relative justify-center items-center py-14.5 px-3">
                <div
                  className="text-white absolute top-0 left-0 py-[2px] px-[6px] rounded font-dm-sans"
                  style={{ backgroundColor: product.badgeColor }}
                >
                  {product?.badge}
                </div>
                <div className="max-w-[228.39px] max-h-[144px]">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={product.url}
                    alt=""
                  />
                </div>
              </div>

              {/* text container */}
              <div className="border-t p-3 border-[#F1F5F9] rounded-b-md">
                <div className="flex flex-col pt-[6.5px] gap-[2.5px]">
                  <h1 className="text-[#94A3B8] font-bold text-[10px]">
                    {product.brand}
                  </h1>
                  <h1 className="text-xs font-bold text-[#1E293B]">
                    {product.title}
                  </h1>
                  <div className="flex items-center">
                    <h1 className="text-[#DC2626] font-bold text-sm">
                      {product.price}
                    </h1>
                    <h2 className="pl-1 text-[#94A3B8] text-[11px]">
                      {product.compare_price}
                    </h2>
                    <h3 className="pl-1.5 text-[10px] font-bold text-[#059669]">
                      {product.discount}
                    </h3>
                  </div>

                  <div className="pt-3">
                    <button className="bg-[#DC2626] text-white text-[11px] font-bold py-2 px-4 rounded">
                      Customarize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>





      </div>
    </div>
  );
}
