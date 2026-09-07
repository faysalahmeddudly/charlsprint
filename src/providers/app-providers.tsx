"use client"

import * as React from "react"
import { ThemeProvider } from "./theme-provider"
import { CartProvider } from "./cart-provider"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}
