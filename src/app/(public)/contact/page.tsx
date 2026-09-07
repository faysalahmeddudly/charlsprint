import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact | CharlsPrint",
}

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact us</h1>
        <p className="text-sm text-muted-foreground">
          Have a question about an order or product? Send us a message.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
