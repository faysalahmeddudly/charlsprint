import React from "react";
import { ChevronRight } from "lucide-react";

export default function ShopCategory() {
  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-6 px-8">
      {/* shop category header  */}
      <div className="flex items-center justify-between">
        <h1 className=" font-dm-sans text-2xl font-bold tracking-[-0.6px] text-[#111827]">
          Shop by Category
        </h1>

        <div className="flex items-center justify-center">
          <h3 className="text-[#EF4444]"> All Categories</h3>
          <ChevronRight color="#EF4444" />
        </div>
      </div>

{/* card container div */}



    </div>
  );
}
