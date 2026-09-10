import type { Metadata } from "next"
import { ProductCustomizer } from "@/components/shop/product-customizer"
import { garments } from "../../../create-design/_data"

export const metadata: Metadata = {
  title: "Design | CharlsPrint",
}

export default function DesignPage() {
  return <ProductCustomizer garment={garments[0]} />
}
