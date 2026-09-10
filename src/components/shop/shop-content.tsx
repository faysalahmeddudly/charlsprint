"use client"

import { useMemo, useState, type Dispatch, type SetStateAction } from "react"
import { useSearchParams } from "next/navigation"
import type { Garment } from "@/app/(public)/create-design/_data"
import type { ProductFilters } from "@/types"
import { ProductGrid } from "@/components/shop/product-grid"
import { FilterComponent } from "@/components/shop/filter-component"
import { PriceFilter } from "@/components/shop/price-filter"
import { SidebarBanners } from "@/components/shop/sidebar-banners"
import { ShopSponsoredBanner } from "@/components/shop/shop-sponsored-banner"
import type { ShopFilterItem } from "@/app/(public)/shop/_data"

function sortProducts(products: Garment[], sort: ProductFilters["sort"] | "") {
  if (!sort) return products

  const sorted = [...products]
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "newest":
    default:
      return sorted
  }
}

export function ShopContent({
  products,
  categories,
  tags,
}: {
  products: Garment[]
  categories: ShopFilterItem[]
  tags: ShopFilterItem[]
}) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const search = searchParams.get("query") ?? ""

  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<ProductFilters["sort"] | "">("")

  const toggle = (setter: Dispatch<SetStateAction<string[]>>) => (id: string) => {
    setter((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesQuery = query ? product.name.toLowerCase().includes(query) : true
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag))

      return matchesQuery && matchesCategory && matchesTags
    })

    return sortProducts(filtered, sortBy)
  }, [products, search, selectedCategories, selectedTags, sortBy])

  return (
    <section className="w-full bg-white px-4 py-4 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1216px]">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside
            className={`fixed top-0 left-0 z-10 h-full w-65 shrink-0 overflow-y-auto bg-white px-4 py-6 transition-transform duration-300 md:static md:h-auto md:w-55 md:translate-x-0 md:px-0 md:py-0 ${
              filterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-4 flex items-center justify-between md:hidden">
              <h3 className="text-[16px] font-semibold">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-xl text-gray-500">
                ✕
              </button>
            </div>

            <FilterComponent
              title="Categories"
              items={categories}
              selectedIds={selectedCategories}
              onToggle={toggle(setSelectedCategories)}
            />
            <FilterComponent
              title="Tags"
              items={tags}
              selectedIds={selectedTags}
              onToggle={toggle(setSelectedTags)}
            />

            <SidebarBanners />
          </aside>

          {/* Overlay for mobile */}
          {filterOpen && (
            <div
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 z-5 bg-black/40 md:hidden"
            />
          )}

          {/* Right Content */}
          <div className="flex-1">
            {/* <ShopSponsoredBanner /> */}

            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[10px] font-bold text-[#000116] sm:text-[28px] md:text-[32px]">
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

            <p className="text-[14px] font-medium text-[#636363]">
              Price and other details may vary based on product size and color.
            </p>

            <div className="mt-5">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
