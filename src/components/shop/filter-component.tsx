import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import type { ShopFilterItem } from "@/app/(public)/shop/_data"

export function FilterComponent({
  title,
  items,
  selectedIds,
  onToggle,
}: {
  title: string
  items: ShopFilterItem[]
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  if (items.length === 0) return null

  return (
    <Collapsible defaultOpen className="border-b border-[#E5E7EB] py-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-semibold text-[#111827]">
        {title}
        <ChevronDown className="h-4 w-4 text-[#636363]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pt-3">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-center gap-2 text-sm text-[#374151]"
          >
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => onToggle(item.id)}
            />
            {item.label}
          </label>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
