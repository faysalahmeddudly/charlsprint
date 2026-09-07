"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { authService } from "@/services/auth.service"
import { ApiClientError } from "@/services/api-client"

const initialValues: RegisterInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export function RegisterForm() {
  const router = useRouter()
  const [values, setValues] = React.useState<RegisterInput>(initialValues)
  const [errors, setErrors] = React.useState<Partial<Record<keyof RegisterInput, string>>>({})
  const [formError, setFormError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const result = registerSchema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RegisterInput
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    try {
      await authService.register(result.data)
      router.push("/")
    } catch (error) {
      setFormError(error instanceof ApiClientError ? error.message : "Unable to create account")
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateField<K extends keyof RegisterInput>(key: K, value: RegisterInput[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Full name
        </label>
        <Input
          id="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => updateField("password", e.target.value)}
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  )
}
