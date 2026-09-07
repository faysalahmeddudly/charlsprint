import type { ReactNode } from "react"
import { AuthHeader } from "@/components/layout/auth-header"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">{children}</main>
    </>
  )
}
