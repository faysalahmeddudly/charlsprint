"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactInput } from "@/lib/validations/contact"
import { contactService } from "@/services/contact.service"

const initialValues: ContactInput = { name: "", email: "", subject: "", message: "" }

export function ContactForm() {
  const [values, setValues] = React.useState<ContactInput>(initialValues)
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactInput, string>>>({})
  const [status, setStatus] = React.useState<"idle" | "submitting" | "sent" | "error">("idle")

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const result = contactSchema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactInput
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setStatus("submitting")
    try {
      await contactService.send(result.data)
      setStatus("sent")
      setValues(initialValues)
    } catch {
      setStatus("error")
    }
  }

  function updateField<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  if (status === "sent") {
    return <p className="text-sm text-muted-foreground">Thanks for reaching out! We&apos;ll reply soon.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" value={values.name} onChange={(e) => updateField("name", e.target.value)} />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          value={values.subject}
          onChange={(e) => updateField("subject", e.target.value)}
        />
        {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
