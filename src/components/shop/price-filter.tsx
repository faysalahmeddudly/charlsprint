import type { ProductFilters } from "@/types"

const SORT_OPTIONS: { value: NonNullable<ProductFilters["sort"]>; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

export function PriceFilter({
  value,
  onChange,
}: {
  value: ProductFilters["sort"] | ""
  onChange: (value: ProductFilters["sort"] | "") => void
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as ProductFilters["sort"] | "")}
      className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-[#374151] outline-none focus-visible:ring-2 focus-visible:ring-[#636363]/50"
    >
      <option value="">Sort by</option>
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
