import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create account | CharlsPrint",
}

export default function RegisterPage() {
  return (
    <div className="font-rubik flex justify-center items-center overflow-y-auto min-h-screen py-10 sm:overflow-hidden sm:h-screen sm:py-0">

      <RegisterForm />
    </div>
  )
}
