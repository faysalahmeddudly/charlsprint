import { garments } from "../create-design/_data"

export const shopProducts = garments

export interface ShopFilterItem {
  id: string
  label: string
}

export const shopCategories: ShopFilterItem[] = Array.from(
  new Set(garments.map((garment) => garment.category))
).map((category) => ({ id: category, label: category }))

export const shopTags: ShopFilterItem[] = Array.from(
  new Set(garments.flatMap((garment) => garment.tags))
).map((tag) => ({ id: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1) }))
