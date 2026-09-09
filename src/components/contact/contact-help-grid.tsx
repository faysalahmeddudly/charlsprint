import Image from "next/image";

const helpTopics = [
  { label: "Order Issues", icon: "/assets/contact/order-issues.png" },
  { label: "Delivery", icon: "/assets/contact/delivery.png" },
  { label: "Return & Refund", icon: "/assets/contact/return-refund.png" },
  { label: "Payment & Promos", icon: "/assets/contact/payment-promos.png" },
  { label: "Account", icon: "/assets/contact/account.png" },
  { label: "Suggestion/Dispute", icon: "/assets/contact/suggestion-dispute.png" },
];

export function ContactHelpGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
      {helpTopics.map((topic) => (
        <div
          key={topic.label}
          className="flex aspect-[180/185] flex-col items-center justify-center gap-4 rounded-md border border-gray-300 p-4"
        >
          <Image
            src={topic.icon}
            alt={topic.label}
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
          <p className="text-center text-[16px] font-bold text-[#636363]">
            {topic.label}
          </p>
        </div>
      ))}
    </div>
  );
}
