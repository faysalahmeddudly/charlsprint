import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create account | CharlsPrint",
}

export default function RegisterPage() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Join CharlsPrint to start shopping</p>
      </div>
      <RegisterForm />
    </div>
  )
}
