import {
  SiPaypal,
  SiMastercard,
  SiVisa,
  SiAmericanexpress,
  SiApplepay,
  SiGooglepay,
  SiStripe,
} from "react-icons/si";
import { Landmark } from "lucide-react";

const paymentMethods = [
  { label: "PayPal", Icon: SiPaypal, color: "#003087" },
  { label: "Mastercard", Icon: SiMastercard, color: "#EB001B" },
  { label: "Visa", Icon: SiVisa, color: "#1A1F71" },
  { label: "American Express", Icon: SiAmericanexpress, color: "#2E77BC" },
  { label: "Apple Pay", Icon: SiApplepay, color: "#000000" },
  { label: "Google Pay", Icon: SiGooglepay, color: "#4285F4" },
  { label: "Stripe", Icon: SiStripe, color: "#635BFF" },
];

export function PaymentMethodsGrid() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {paymentMethods.map(({ label, Icon, color }) => (
        <div
          key={label}
          title={label}
          className="flex h-14 items-center justify-center rounded-md border border-gray-200 bg-white"
        >
          <Icon className="size-6" style={{ color }} />
        </div>
      ))}
      <div
        title="Bank Transfer"
        className="flex h-14 items-center justify-center rounded-md border border-gray-200 bg-white"
      >
        <Landmark className="size-5 text-[#374151]" />
      </div>
    </div>
  );
}
