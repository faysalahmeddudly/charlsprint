
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
    { href: "/order-tracking", label: "Track Order" },
  ];

  return (
    <header className="bg-[#DC2626] ">
      <div className="max-w-[1440px] mx-auto px-2 py-4 ">
        {/* nav header */}
        <div className=" max-w-[1280] mx-auto">
          <div className="flex align-center">
            
            <div className="py-[2px] items-center justify-center flex px-2 rounded bg-[#FFFFFFCC]/80 tracking-[.25px] text-[10px] uppercase text-[#000000]">
             <div>AUSTRALIA WIDE</div>
            </div>
            <div className="text-[12px] leading-[16px] font-normal pl-3 text-[#FFFFFF]">
              Sweatshop Free • Eco-Friendly • WRAP Certified | Call Us: +61 406
              380 648
            </div>

            <div className="">
Sign Up & Get 10% Off Your First Bulk Order!

            </div>

            <div> </div>
          </div>
        </div>

        {/* navbar */}
        <nav></nav>
      </div>
    </header>
  );
}
