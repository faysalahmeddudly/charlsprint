import type { Product } from "@/types"

export interface GarmentColor {
  id: string
  name: string
  swatch: string
}

export interface GarmentSize {
  id: string
  label: string
  defaultQty: number
}

export interface GarmentPricingTier {
  id: string
  label: string
  minQty: number
  discountRate: number
}

export interface GarmentPrintZone {
  id: string
  label: string
  status: "Applied" | "Empty"
}

export interface Garment extends Product {
  sku: string
  fabric: string
  fit: string
  stockCount: number
  basePricePerUnit: number
  printZones: GarmentPrintZone[]
  colors: GarmentColor[]
  sizes: GarmentSize[]
  pricingTiers: GarmentPricingTier[]
}

export const garments: Garment[] = [
  {
    id: "1",
    slug: "as-colour-5001-staple",
    name: "AS Colour 5001 Staple",
    description:
      "180 GSM combed cotton tee with a standard retail fit. Built for full-colour DTG printing across the front chest, back body, and both sleeves.",
    price: 23.1,
    currency: "USD",
    category: "T-Shirts",
    tags: ["staple", "bestseller", "dtg"],
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    images: [{ id: "img-1", url: "/shirt.png", alt: "AS Colour 5001 Staple tee, navy" }],
    sku: "ASC-5001-WBLK",
    fabric: "180 GSM Combed Cotton",
    fit: "Standard Retail Fit",
    stockCount: 2450,
    basePricePerUnit: 23.1,
    printZones: [
      { id: "front-chest", label: "Front Chest", status: "Applied" },
      { id: "back-body", label: "Back Body", status: "Empty" },
      { id: "left-sleeve", label: "Left Sleeve", status: "Empty" },
      { id: "right-sleeve", label: "Right Sleeve", status: "Empty" },
    ],
    colors: [
      { id: "black", name: "Black", swatch: "#0a0a0a" },
      { id: "cream", name: "Cream", swatch: "#efe6d3" },
      { id: "forest", name: "Forest Green", swatch: "#1e4632" },
      { id: "navy", name: "Navy", swatch: "#1b2a4a" },
      { id: "grey", name: "Grey Marle", swatch: "#9a9a9a" },
      { id: "maroon", name: "Maroon", swatch: "#5c1f2e" },
      { id: "tan", name: "Tan", swatch: "#c9ab7f" },
      { id: "rust", name: "Rust", swatch: "#a15c34" },
    ],
    sizes: [
      { id: "xs", label: "XS", defaultQty: 0 },
      { id: "s", label: "S", defaultQty: 5 },
      { id: "m", label: "M", defaultQty: 15 },
      { id: "l", label: "L", defaultQty: 18 },
      { id: "xl", label: "XL", defaultQty: 10 },
      { id: "2xl", label: "2XL", defaultQty: 2 },
      { id: "3xl", label: "3XL", defaultQty: 0 },
    ],
    pricingTiers: [
      { id: "sample", label: "Sample (1 pc)", minQty: 1, discountRate: 0 },
      { id: "team", label: "Team (25 pcs)", minQty: 25, discountRate: 0.08 },
      { id: "bulk", label: "Bulk Merch (50+)", minQty: 50, discountRate: 0.18 },
    ],
  },
  {
    id: "2",
    slug: "panmax-essential-tee-2-pack",
    name: "Panmax Essential Tee 2-Pack",
    description:
      "Premium cotton essentials in black and sage, folded and ready for merch runs that need a softer hand-feel.",
    price: 19.5,
    currency: "USD",
    category: "T-Shirts",
    tags: ["essential", "2-pack"],
    rating: 4.6,
    reviewCount: 132,
    inStock: true,
    images: [{ id: "img-2", url: "/asColorExample.jpg", alt: "Panmax essential tees, black and sage" }],
    sku: "PMX-ESS-2PK",
    fabric: "220 GSM Ringspun Cotton",
    fit: "Relaxed Fit",
    stockCount: 1180,
    basePricePerUnit: 19.5,
    printZones: [
      { id: "front-chest", label: "Front Chest", status: "Empty" },
      { id: "back-body", label: "Back Body", status: "Empty" },
      { id: "left-sleeve", label: "Left Sleeve", status: "Empty" },
      { id: "right-sleeve", label: "Right Sleeve", status: "Empty" },
    ],
    colors: [
      { id: "black", name: "Black", swatch: "#0a0a0a" },
      { id: "sage", name: "Sage", swatch: "#cddccb" },
      { id: "grey", name: "Grey Marle", swatch: "#9a9a9a" },
    ],
    sizes: [
      { id: "xs", label: "XS", defaultQty: 0 },
      { id: "s", label: "S", defaultQty: 8 },
      { id: "m", label: "M", defaultQty: 12 },
      { id: "l", label: "L", defaultQty: 10 },
      { id: "xl", label: "XL", defaultQty: 6 },
      { id: "2xl", label: "2XL", defaultQty: 0 },
      { id: "3xl", label: "3XL", defaultQty: 0 },
    ],
    pricingTiers: [
      { id: "sample", label: "Sample (1 pc)", minQty: 1, discountRate: 0 },
      { id: "team", label: "Team (25 pcs)", minQty: 25, discountRate: 0.06 },
      { id: "bulk", label: "Bulk Merch (50+)", minQty: 50, discountRate: 0.15 },
    ],
  },
  {
    id: "3",
    slug: "as-colour-5001-staple-navy",
    name: "AS Colour 5001 Staple — Navy Run",
    description:
      "The same 180 GSM staple tee, pre-configured as a navy team order with a full front-chest print applied.",
    price: 23.1,
    currency: "USD",
    category: "T-Shirts",
    tags: ["staple", "navy", "team"],
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    images: [{ id: "img-3", url: "/shirt.png", alt: "AS Colour 5001 Staple tee, navy" }],
    sku: "ASC-5001-NAVY",
    fabric: "180 GSM Combed Cotton",
    fit: "Standard Retail Fit",
    stockCount: 940,
    basePricePerUnit: 23.1,
    printZones: [
      { id: "front-chest", label: "Front Chest", status: "Applied" },
      { id: "back-body", label: "Back Body", status: "Empty" },
      { id: "left-sleeve", label: "Left Sleeve", status: "Empty" },
      { id: "right-sleeve", label: "Right Sleeve", status: "Empty" },
    ],
    colors: [
      { id: "navy", name: "Navy", swatch: "#1b2a4a" },
      { id: "black", name: "Black", swatch: "#0a0a0a" },
      { id: "grey", name: "Grey Marle", swatch: "#9a9a9a" },
    ],
    sizes: [
      { id: "xs", label: "XS", defaultQty: 0 },
      { id: "s", label: "S", defaultQty: 4 },
      { id: "m", label: "M", defaultQty: 10 },
      { id: "l", label: "L", defaultQty: 12 },
      { id: "xl", label: "XL", defaultQty: 6 },
      { id: "2xl", label: "2XL", defaultQty: 0 },
      { id: "3xl", label: "3XL", defaultQty: 0 },
    ],
    pricingTiers: [
      { id: "sample", label: "Sample (1 pc)", minQty: 1, discountRate: 0 },
      { id: "team", label: "Team (25 pcs)", minQty: 25, discountRate: 0.08 },
      { id: "bulk", label: "Bulk Merch (50+)", minQty: 50, discountRate: 0.18 },
    ],
  },
]

export function getGarmentBySlug(slug: string) {
  return garments.find((garment) => garment.slug === slug) ?? null
}
