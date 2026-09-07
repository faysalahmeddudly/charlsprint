import type { ReactNode } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8">{children}</main>
      <SiteFooter />
    </>
  )
}
