import {
  Bird,
  Cpu,
  Flag,
  Leaf,
  Mountain,
  Ruler,
  Shirt,
  Skull,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { anton, bebasNeue, cinzel, plusJakartaSans } from "@/lib/fonts"

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export const VISIBLE_COLOR_COUNT = 8

export const SURFACE_CARD =
  "w-full h-fit flex flex-col gap-2 p-3 rounded-lg bg-card-secondary shadow-[0_1px_2px_0_#0000000D]"

export const ZONE_ICONS: Record<string, LucideIcon> = {
  "front-chest": Shirt,
  "back-body": Shirt,
  "left-sleeve": Ruler,
  "right-sleeve": Ruler,
}

export function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

export interface GraphicAsset {
  id: string
  name: string
  meta: string
  category: string
  tile: string
  iconColor: string
  icon: LucideIcon
}

export const GRAPHIC_CATEGORIES = [
  "All Assets",
  "Streetwear & Y2K",
  "Mascots & Skulls",
  "Vintage & Crests",
  "Minimalist Badges",
  "Typography Marks",
  "Band & Concert",
]

export const GRAPHIC_ASSETS: GraphicAsset[] = [
  {
    id: "skull",
    name: "Overdrive Skull Emblem",
    meta: "Vector SVG • 2 Colors",
    category: "Mascots & Skulls",
    tile: "bg-neutral-900",
    iconColor: "text-white",
    icon: Skull,
  },
  {
    id: "circuit",
    name: "Cyber Circuit Core",
    meta: "Vector • Y2K Tech",
    category: "Streetwear & Y2K",
    tile: "bg-neutral-900",
    iconColor: "text-cyan-400",
    icon: Cpu,
  },
  {
    id: "kanji",
    name: "Tokyo Racing Kanji",
    meta: "Vector • JDM Division",
    category: "Streetwear & Y2K",
    tile: "bg-neutral-900",
    iconColor: "text-orange-400",
    icon: Flag,
  },
  {
    id: "alpine",
    name: "Alpine Explorer Badge",
    meta: "Outdoor • Stamp Line",
    category: "Minimalist Badges",
    tile: "bg-emerald-900",
    iconColor: "text-emerald-300",
    icon: Mountain,
  },
  {
    id: "flora",
    name: "Acid Flora Botanical",
    meta: "Vector • Botanical",
    category: "Vintage & Crests",
    tile: "bg-purple-900",
    iconColor: "text-lime-400",
    icon: Leaf,
  },
  {
    id: "sunburst",
    name: "Retro Sunburst 70s",
    meta: "Vector • Retro",
    category: "Vintage & Crests",
    tile: "bg-amber-900",
    iconColor: "text-amber-300",
    icon: Sun,
  },
  {
    id: "griffin",
    name: "Gothic Metal Griffin",
    meta: "Vector • Band Series",
    category: "Band & Concert",
    tile: "bg-neutral-900",
    iconColor: "text-red-400",
    icon: Bird,
  },
  {
    id: "bolt",
    name: "Speed Bolt Monogram",
    meta: "Vector • Typography",
    category: "Typography Marks",
    tile: "bg-blue-950",
    iconColor: "text-sky-300",
    icon: Zap,
  },
]

export interface TextFont {
  id: string
  label: string
  sublabel: string
  cssVar: string
  family: string
}

export const TEXT_FONTS: TextFont[] = [
  {
    id: "bebas-neue",
    label: "Bebas Neue",
    sublabel: "Athletic Condensed",
    cssVar: "var(--font-bebas-neue)",
    family: bebasNeue.style.fontFamily,
  },
  {
    id: "heavy-gothic",
    label: "Heavy Gothic",
    sublabel: "Streetwear Impact",
    cssVar: "var(--font-anton)",
    family: anton.style.fontFamily,
  },
  {
    id: "jakarta-modern",
    label: "Jakarta Modern",
    sublabel: "Clean Tech Editorial",
    cssVar: "var(--font-plus-jakarta-sans)",
    family: plusJakartaSans.style.fontFamily,
  },
  {
    id: "cinzel-luxury",
    label: "Cinzel Luxury",
    sublabel: "Vintage Roman Serif",
    cssVar: "var(--font-cinzel)",
    family: cinzel.style.fontFamily,
  },
]

export const INK_TONES = ["#FFFFFF", "#F97316", "#EAB308", "#06B6D4", "#10B981", "#CBD5E1", "#CA8A04", "#E11D48"]

export interface TextStyle {
  value: string
  subtitle: string
  fontId: string
  fontScale: number
  letterSpacing: number
  align: "left" | "center" | "right" | "justify"
  bold: boolean
  italic: boolean
  underline: boolean
  uppercase: boolean
  curvature: number
  outline: boolean
  outlineWidth: number
  color: string
}

export const DEFAULT_TEXT_STYLE: TextStyle = {
  value: "Overdrive\nArchive",
  subtitle: "AUTONOMOUS SPEED DIVISION • 2024",
  fontId: TEXT_FONTS[0].id,
  fontScale: 42,
  letterSpacing: 2.5,
  align: "center",
  bold: true,
  italic: false,
  underline: false,
  uppercase: true,
  curvature: 0,
  outline: false,
  outlineWidth: 2,
  color: "#FFFFFF",
}

export type ZoneContent =
  | { type: "graphic"; assetId: string }
  | ({ type: "text" } & TextStyle)
  | undefined
