import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT_PHONE = "+61 406 380 648";
const CONTACT_EMAIL = "sales@charlesprints.com.au";
const CONTACT_ADDRESS = "Unit 16, 71A Milperra Road, Revesby, NSW 2212";

export function ContactInfoBar() {
  return (
    <div className="rounded-md border border-gray-200 px-6 py-8">
      <h2 className="text-center text-xl font-bold text-[#111827]">Get in touch!</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center justify-center gap-2 pt-6 text-sm text-[#636363] sm:pt-0">
          <Phone className="size-4 shrink-0" />
          <span>{CONTACT_PHONE}</span>
        </div>
        <div className="flex items-center justify-center gap-2 pt-6 text-sm text-[#636363] sm:pt-0">
          <Mail className="size-4 shrink-0" />
          <span>{CONTACT_EMAIL}</span>
        </div>
        <div className="flex items-center justify-center gap-2 pt-6 text-center text-sm text-[#636363] sm:pt-0">
          <MapPin className="size-4 shrink-0" />
          <span>{CONTACT_ADDRESS}</span>
        </div>
      </div>
    </div>
  );
}
