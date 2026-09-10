import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign in | CharlsPrint",
}

export default function LoginPage() {
  return (
     <div className="font-rubik flex justify-center items-center overflow-y-auto min-h-screen py-10 sm:overflow-hidden sm:h-screen sm:py-0">
    
          <LoginForm/>
        </div>
  )
}
