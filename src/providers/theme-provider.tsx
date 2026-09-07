"use client"

import * as React from "react"

// Dark mode disabled - theme provider is a passthrough
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useTheme() {
  return { theme: "light" as const, setTheme: () => {} }
}
