import { ChevronDown, ChevronRight } from "lucide-react";

type CategoryItem = {
  label: string;
  subItems?: string[];
};

const categories: CategoryItem[] = [
  {
    label: "Men",
    subItems: [
      "Crew Neck",
      "V-Neck",
      "Crew Neck",
      "Boxy/Oversized",
      "Crew Neck",
      "Slim Fit",
      "Regular Fit",
      "Relax Fit",
      "Shorter",
      "Taller",
    ],
  },
  { label: "Women" },
  { label: "Kids" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const swatchColors = [
  "#EF4444",
  "#22C55E",
  "#EAB308",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export function ShopSidebar() {
  return (
    <div className="flex flex-col gap-2.5">
      <div>
        <h3 className="mb-4 text-base font-bold text-[#000116]">
          Shop by Categories
        </h3>

        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${
                    category.subItems
                      ? "text-[#636363]"
                      : "font-semibold text-[#111827]"
                  }`}
                >
                  {category.label}
                </span>
                <ChevronRight className="size-4 text-[#9CA3AF]" />
              </div>

              {category.subItems && (
                <div className="mt-3 flex flex-col gap-3">
                  {category.subItems.map((label, index) => (
                    <span
                      key={`${label}-${index}`}
                      className="text-sm text-[#636363]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[#FF3008]"
        >
          See all <ChevronDown className="size-4" />
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-base font-bold text-[#000116]">
          Price Range
        </h3>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Min price"
            className="h-10 w-full rounded-[4px] border border-[#636363]/20 bg-white px-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#EF252C] focus-visible:ring-offset-0"
          />
          <input
            type="text"
            placeholder="Max price"
            className="h-10 w-full rounded-[4px] border border-[#636363]/20 bg-white px-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#EF252C] focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-bold text-[#000116]">Size</h3>

        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <div
              key={size}
              className="flex h-10 items-center justify-center rounded-[4px] border border-[#636363]/20 bg-white text-sm text-[#374151]"
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-bold text-[#000116]">Color</h3>

        <div className="grid grid-cols-5 gap-2">
          {swatchColors.map((color, index) => (
            <div
              key={index}
              style={color ? { backgroundColor: color } : undefined}
              className="aspect-square w-full rounded-[4px] border border-[#E5E7EB] bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
