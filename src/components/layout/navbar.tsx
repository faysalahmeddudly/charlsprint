"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Menu,
  PencilLine,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import LogoComp from "../shared/logoComp";
import { Input } from "../ui/input";
import { GarmentsDrawer } from "./garments-drawer";

export function Navbar() {
  const [isGarmentsOpen, setIsGarmentsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/create-design", label: "Create Design" },
    { href: "/order-tracking", label: "Order Tracking" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="">
      <div className="bg-[#DC2626] ">
        <div className="max-w-[1440px] mx-auto px-2 py-4 ">
          {/* nav header */}
          <div className=" max-w-[1280] mx-auto">
            <div className="flex align-center justify-between ">
              <div className="flex items-center">
                <div className="py-[2px] items-center justify-center flex px-2 rounded bg-[#FFFFFFCC]/80 tracking-[.25px] text-[10px] uppercase text-[#000000]">
                  <div>AUSTRALIA WIDE</div>
                </div>
                <div className="text-[12px] leading-[16px] font-normal pl-3 text-[#FFFFFF]">
                  Sweatshop Free • Eco-Friendly • WRAP Certified | Call Us: +61
                  406 380 648
                </div>
              </div>

              <div className="flex items-center ">
                {" "}
                <div className="text-[12px] leading-[16px] font-normal pl-3 text-[#FFFFFF]">
                  Sign Up & Get 10% Off Your First Bulk Order!
                </div>
                <div className="pl-4">
                  <Link
                    href="/login"
                    className="rounded-full  px-3 py-1 bg-white  text-xs font-medium whitespace-nowrap"
                  >
                    Sign up today →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* navbar */}
      <nav>
        <div className="bg-[#0B0F19]">
          <div className="max-w-[1216px] mx-auto  gap-3 py-2 flex items-center justify-between">
            {/* logo div */}

            <div className="shrink-0">
              <LogoComp className={""} src={"/logo2.png"}></LogoComp>
            </div>

            {/* input div */}
            <div className="flex-1 max-w-[720px] px-4">
              <div className="flex h-10 items-stretch overflow-hidden rounded-[6px] bg-white">
                <button className="flex items-center gap-1 shrink-0 rounded-l-[6px] border-r border-[#CBD5E1] bg-[#F1F5F9] py-2 pr-6 pl-2 text-xs leading-4 font-normal text-[#334155] whitespace-nowrap">
                  All Products
                  <ChevronDown className="size-4 text-[#6B7280]" />
                </button>
                <Input
                  placeholder="Search custom tees, AS Colour, embroidery, codes..."
                  className="h-auto flex-1 rounded-none border-0 bg-white px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:ring-0"
                />
                <button className="flex items-center justify-center shrink-0 bg-[#DC2626] px-5">
                  <Search className="size-4 text-white" />
                </button>
              </div>
            </div>

            {/* icons link page */}
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-[#1F2937] px-4 py-2 text-sm font-medium text-[#D1D5DB] whitespace-nowrap">
                AUD ($)
              </button>
              <button className="flex items-center gap-2 rounded-full bg-[#1F2937] px-4 py-2 text-sm font-medium text-white whitespace-nowrap">
                <PencilLine className="size-4" />
                Design Studio
              </button>
              <button className="relative flex items-center justify-center">
                <ShoppingCart className="size-5 text-white" />
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-medium text-white">
                  0
                </span>
              </button>
              <button className="flex items-center justify-center">
                <User className="size-5 text-white" />
              </button>
            </div>
          </div>
        </div>


{/* order design */}

        <div className="bg-[#111827]">
          <div className="max-w-[1216px] mx-auto gap-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setIsGarmentsOpen(true)}
                className="flex items-center gap-2 rounded bg-[#DC2626] px-4 py-2 text-sm font-semibold tracking-wide text-white uppercase whitespace-nowrap"
              >
                <Menu className="size-4" />
                All Garments
              </button>

              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-normal text-[#E5E7EB] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <button className="flex items-center justify-center">
              <Heart className="size-5 text-[#E5E7EB]" />
            </button>
          </div>
        </div>



      </nav>

      <GarmentsDrawer isOpen={isGarmentsOpen} onClose={() => setIsGarmentsOpen(false)} />
    </header>
  );
}
