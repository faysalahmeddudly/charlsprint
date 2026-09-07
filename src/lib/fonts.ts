import { Anton, Bebas_Neue, Cinzel, DM_Sans, Inter, Plus_Jakarta_Sans } from "next/font/google"

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
})

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
})

export const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
})

export const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
})
