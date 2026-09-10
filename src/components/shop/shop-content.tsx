"use client";
import { ArrowDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Garment } from "@/app/(public)/create-design/_data";
import type { ProductFilters } from "@/types";
import ProductCardSm, {
  type ProductHome,
} from "@/components/shared/ProductCardSm";
import { PriceFilter } from "@/components/shop/price-filter";
import { ShopSidebar } from "@/components/shop/shop-sidebar";

function toProductHome(garment: Garment): ProductHome {
  const badge = garment.tags.includes("bestseller")
    ? "HOT"
    : garment.tags.includes("team")
      ? "TOP"
      : "NEW";
  const discount =
    garment.compareAtPrice && garment.compareAtPrice > garment.price
      ? `-${Math.round((1 - garment.price / garment.compareAtPrice) * 100)}%`
      : "";

  return {
    id: Number(garment.id),
    image: garment.images[0]?.url ?? "/shirt.png",
    badge,
    brand: garment.category.toUpperCase(),
    title: garment.name,
    price: `$${garment.price.toFixed(2)}`,
    compare_price: garment.compareAtPrice
      ? `$${garment.compareAtPrice.toFixed(2)}`
      : "",
    discount,
    available_color: garment.colors.slice(0, 4).map((color, index) => ({
      id: index + 1,
      hex: color.swatch,
    })),
  };
}

function sortProducts(products: Garment[], sort: ProductFilters["sort"] | "") {
  if (!sort) return products;

  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
    default:
      return sorted;
  }
}

export function ShopContent({ products }: { products: Garment[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("query") ?? "";

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<ProductFilters["sort"] | "">("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) =>
      query ? product.name.toLowerCase().includes(query) : true,
    );

    return sortProducts(filtered, sortBy);
  }, [products, search, sortBy]);

  return (
    <section className="w-full bg-white px-4 pb-4 sm:px-6 sm:pb-10 lg:px-10">
      <div className="mx-auto max-w-[1216px]">
        <div className="flex gap-[42px]">
          {/* Left Sidebar */}
          <aside
            className={`fixed top-0 left-0 z-10 py-[34px] px-[19px] bg-white md:bg-[#F3F3F3] h-full w-65 shrink-0 overflow-y-auto transition-transform duration-300 md:static md:h-auto md:w-55 md:translate-x-0 ${
              filterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-4 flex items-center justify-between md:hidden">
              <h3 className="text-[16px] font-semibold">Filters</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-xl text-gray-500"
              >
                ✕
              </button>
            </div>

            <ShopSidebar />
          </aside>

          {/* Overlay for mobile */}
          {filterOpen && (
            <div
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 z-5 bg-black/40 md:hidden"
            />
          )}

          {/* Right Content */}
          <div className="flex-1 mt-9">
            {/* <ShopSponsoredBanner /> */}

            <div className="flex flex-col gap-[27px]">
              <div className=" flex items-center justify-between">
                <h2 className="font-rubik text-[32px] leading-none font-semibold text-[#000116]">
                  {search ? `Results for "${search}"` : "All Products"}
                </h2>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="flex items-center gap-2 rounded border border-[#FF3008] px-4 py-1.5 text-[14px] font-medium text-[#FF3008] md:hidden"
                  >
                    Filter <span>⇈⇊</span>
                  </button>

                  <PriceFilter value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              <div className="font-rubik text-[14px] leading-none font-medium text-[#636363]">
                Price and other details may vary based on product size and
                color.
              </div>

              <div className="">
                {filteredProducts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No products found.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((garment) => (
                      <Link
                        key={garment.id}
                        href={`/shop/${garment.slug}`}
                        className="block"
                      >
                        <ProductCardSm product={toProductHome(garment)} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="flex items-center gap-2 self-end py-1.5 font-rubik text-sm leading-none font-semibold text-[#EF252C]"
              >
                Browse More
                <ArrowDown className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
