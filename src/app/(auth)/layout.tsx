import type { ReactNode } from "react"
import { AuthHeader } from "@/components/layout/auth-header"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      
      <main className="max-w[1440px]">{children}</main>
    </>
  )
}
