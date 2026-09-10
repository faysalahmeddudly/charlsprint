"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, User, X } from "lucide-react";

type CategoryItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

const categories: CategoryItem[] = [
  {
    label: "Men",
    href: "/create-design?category=men",
    subItems: [
      { label: "Crew Neck", href: "/create-design?category=men&fit=crew-neck" },
      { label: "V-Neck", href: "/create-design?category=men&fit=v-neck" },
      { label: "Crew Neck", href: "/create-design?category=men&fit=crew-neck-2" },
      { label: "Boxy/Oversized", href: "/create-design?category=men&fit=boxy-oversized" },
      { label: "Crew Neck", href: "/create-design?category=men&fit=crew-neck-3" },
      { label: "Slim Fit", href: "/create-design?category=men&fit=slim-fit" },
      { label: "Regular Fit", href: "/create-design?category=men&fit=regular-fit" },
      { label: "Relax Fit", href: "/create-design?category=men&fit=relax-fit" },
      { label: "Shorter", href: "/create-design?category=men&fit=shorter" },
      { label: "Taller", href: "/create-design?category=men&fit=taller" },
    ],
  },
  { label: "Women", href: "/create-design?category=women" },
  { label: "Kids", href: "/create-design?category=kids" },
];

const choices = [
  { label: "New arrival", href: "/create-design?sort=new-arrival" },
  { label: "Best seller", href: "/create-design?sort=best-seller" },
  { label: "Recently explored", href: "/create-design?sort=recently-explored" },
];

const helpLinks = [
  { label: "Your account", href: "/account" },
  { label: "Customer service", href: "/contact" },
  { label: "Privacy & Terms", href: "/privacy" },
];

function CategoryRow({ item }: { item: CategoryItem }) {
  const hasSubItems = !!item.subItems?.length;
  const [expanded, setExpanded] = useState(hasSubItems);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="text-sm font-semibold text-[#111827] hover:text-[#DC2626]"
        >
          {item.label}
        </Link>
        {hasSubItems ? (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
            className="text-[#6B7280]"
          >
            <ChevronDown
              className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
          <Link href={item.href} className="text-[#9CA3AF]">
            <ChevronRight className="size-4" />
          </Link>
        )}
      </div>

      {hasSubItems && expanded && (
        <ul className="mt-3 space-y-3 pl-1">
          {item.subItems!.map((sub, index) => (
            <li key={`${sub.label}-${index}`}>
              <Link
                href={sub.href}
                className="text-sm text-[#4B5563] hover:text-[#DC2626]"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="flex items-center justify-between text-sm font-semibold text-[#111827] hover:text-[#DC2626]"
          >
            {item.label}
            <ChevronRight className="size-4 text-[#9CA3AF]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SeeAllLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-3 flex items-center gap-1 text-sm font-medium text-[#DC2626]"
    >
      See all <ChevronDown className="size-4" />
    </Link>
  );
}

export function GarmentsDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-[300px] flex-col bg-[#F5F5F5] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="All Garments menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0B0F19] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#1F2937] text-white">
              <User className="size-4" />
            </div>
            <span className="text-sm text-white">
              Hello,{" "}
              <Link href="/login" onClick={onClose} className="font-medium text-[#DC2626]">
                sign in
              </Link>
            </span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-[#DC2626]">
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 scrollbar-none">
          <div>
            <h3 className="mb-3 text-sm font-bold text-[#111827]">Shop by Categories</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <CategoryRow key={category.label} item={category} />
              ))}
            </div>
            <SeeAllLink href="/create-design" />
          </div>

          <hr className="border-[#E5E7EB]" />

          <div>
            <h3 className="mb-3 text-sm font-bold text-[#111827]">Shop by Choices</h3>
            <SectionLinks items={choices} />
            <SeeAllLink href="/create-design" />
          </div>

          <hr className="border-[#E5E7EB]" />

          <div>
            <h3 className="mb-3 text-sm font-bold text-[#111827]">Help & Settings</h3>
            <ul className="space-y-3">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#374151] hover:text-[#DC2626]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0B0F19] py-4 text-center">
          <Link href="/login" onClick={onClose} className="text-sm font-medium text-white">
            Sign in / Sign out
          </Link>
        </div>
      </div>
    </>
  );
}
