import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactHelpGrid } from "@/components/contact/contact-help-grid"
import { ContactInfoBar } from "@/components/contact/contact-info-bar"

export const metadata: Metadata = {
  title: "Contact | CharlsPrint",
}

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <ContactHelpGrid />

      <div className="space-y-8">
        <h1 className="text-center text-2xl font-bold text-[#111827] sm:text-[32px]">
          Can&apos;t find the answer you are looking for?
        </h1>
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>

      <ContactInfoBar />
    </div>
  )
}
