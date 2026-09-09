import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ShopCategory() {
  const rowCategories = [
    {id:1,
      bg: "#FFCECE80",
      opacity: "50",
      url: "/shirt.png",
      name: "Man T-Shirt",
    },
    {id:2,
      bg: "#E5FFCE80",
      opacity: "50",
      url: "/shirt.png",
      name: "Man T-Shirt",
    },
    {id:3,
      bg: "#CEDCFF80",
      opacity: "50",
      url: "/shirt.png",
      name: "Man T-Shirt",
    },
    {id:4,
      bg: "#EACEFF80",
      opacity: "50",
      url: "/shirt.png",
      name: "Man T-Shirt",
    },
    {id:5,
      bg: "#CEFCFF80",
      opacity: "50",
      url: "/shirt.png",
      name: "Man T-Shirt",
    },
  ];

  const categories = rowCategories.slice(0, 6);

  return (
    <div className="max-w-[1280px] pt-14 mx-auto flex flex-col gap-6 px-8">
      {/* shop category header  */}
      <div className="flex items-center justify-between">
        <h1 className="font-dm-sans text-2xl font-bold tracking-[-0.6px] text-[#111827]">
          Shop by Category
        </h1>

        <Link
          href="/categories"
          className="flex items-center gap-1 cursor-pointer group"
        >
          <span className="text-[#EF4444] text-xs font-bold group-hover:underline">
            All Categories
          </span>
          <ChevronRight color="#EF4444" size={14} />
        </Link>
      </div>

      {/* card container div */}

<div className="flex items-center justify-center gap-4">
{categories.map(cat=>{
(
    <div className="pt-6 px-4 pb-2">

    </div>
)




})}



</div>








    </div>
  );
}
