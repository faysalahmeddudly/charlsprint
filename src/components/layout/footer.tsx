import Link from "next/link";
import Image from "next/image";
import LogoComp from "../shared/logoComp";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const COMPANY_ADDRESS = "Unit 16, 71A Milperra Road, Revesby, NSW 2212, Australia.";

const SOCIAL_LINKS = [
  { id: "fb", href: "#", Icon: FaFacebookF, color: "#E64F25", size: 16 },
  { id: "instagram", href: "#", Icon: FaInstagram, color: "#EA580C", size: 16 },
];

function FooterLinkColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-dm-sans font-bold text-sm">{title}</h1>

      <div className="flex flex-col gap-2 font-dm-sans">
        {items.map((item) => (
          <Link
            href="#"
            key={item}
            className="text-xs font-normal text-[#FFFFFF]"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIconLink({
  href,
  Icon,
  color,
  size,
}: {
  href: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  size: number;
}) {
  return (
    <div className="flex items-center justify-center p-3 bg-white border rounded-full border-[#CBD5E1]">
      <Link href={href} className="flex items-center justify-center">
        <Icon size={size} color={color} />
      </Link>
    </div>
  );
}

export function Footer() {
  const shopCategories = {
    title: "SHOP CATEGORIES",
    items: [
      "Men's Apparel",
      "Women's Collection",
      "Kid's & Youth",
      "Unisex Hoodies",
      "Accessories & Totes",
      "AS Colour Official",
      "Eco & Organic Range",
    ],
  };

  const customerServices = {
    title: "CUSTOMER SERVICE",
    items: [
      "Online Quote Calculator",
      "Artwork Guidelines & Formats",
      "Shipping & Turnaround Times",
      "Terms and Conditions",
      "Privacy Policy",
      "Wholesale Reseller Program",
      "Print Satisfaction Guarantee",
    ],
  };

  return (
    <footer className="border-t font-dm-sans border bg-[#DC2626] pt-12 pb-8 border-[#CBD5E1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* main content container */}
        <div className="pb-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4  gap-8 text-[#FFFFFF]">
          {/* logo & description container */}
          <div className="flex flex-col gap-[15px]">
            {/* logo div */}
            <div>
              <LogoComp
                className="w-auto max-w-full h-auto rounded-[2px]"
                width={183}
                height={62}
              />
            </div>

            <h1 className="text-xs">Customer Support Hotline:</h1>

            <h1 className="font-bold text-lg sm:text-xl">+61 406 380 648</h1>

            <div className="text-xs">
              <p>{COMPANY_ADDRESS}</p>
              <p>sales@charlesprints.com.au</p>
            </div>
          </div>

          {/* shop categories */}
          <FooterLinkColumn
            title={shopCategories.title}
            items={shopCategories.items}
          />

          {/* Customer Services */}
          <FooterLinkColumn
            title={customerServices.title}
            items={customerServices.items}
          />

          {/* payment method & Follow us */}
          <div className="flex flex-col flex-strt gap-4">
            <h1 className="">PAYMENT METHODS</h1>

            <div className="w-full max-w-[300px]">
              <Image
                src="/paymentImg.png"
                alt="Charls Print"
                width={300}
                height={40}
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1>Follow Us</h1>

              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ id, href, Icon, color, size }) => (
                  <SocialIconLink
                    key={id}
                    href={href}
                    Icon={Icon}
                    color={color}
                    size={size}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* copyright */}

        <div className="pt-6 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between text-xs text-[#FFFFFF] border-t border-[#E2E8F0]">
          <div>
            © 2026 Charles Prints All Rights Reserved. {COMPANY_ADDRESS}
          </div>

          <div>Design & Developed By Second Source BD LLC</div>
        </div>
      </div>
    </footer>
  );
}
