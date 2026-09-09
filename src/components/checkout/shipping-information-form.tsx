"use client";

import { MapPin } from "lucide-react";
import { AU_STATES, type CheckoutInput } from "@/lib/validations/checkout";
import { cn } from "@/lib/utils";

type ShippingAddressValues = CheckoutInput["shippingAddress"];

const fieldClassName =
  "w-full rounded-md border border-gray-300 bg-[#F5F5F5] px-3 py-2 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus-visible:ring-0";

export function ShippingInformationForm({
  values,
  email,
  onEmailChange,
  onFieldChange,
  saveAddress,
  onSaveAddressChange,
  errors,
}: {
  values: ShippingAddressValues;
  email: string;
  onEmailChange: (value: string) => void;
  onFieldChange: <K extends keyof ShippingAddressValues>(
    key: K,
    value: ShippingAddressValues[K]
  ) => void;
  saveAddress: boolean;
  onSaveAddressChange: (value: boolean) => void;
  errors: Partial<Record<string, string>>;
}) {
  return (
    <div className="w-full md:w-[55%]">
      <h1 className="text-2xl font-bold text-[#111827]">Getting your order</h1>
      <p className="mt-1 border-b border-gray-200 pb-3 text-sm text-muted-foreground">
        Shipping information
      </p>

      <div className="mt-5 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-[#111827]">
            Full Name
          </label>
          <input
            id="fullName"
            placeholder="ex: Adil Hasan"
            value={values.fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            className={fieldClassName}
          />
          {errors["shippingAddress.fullName"] && (
            <p className="text-xs text-destructive">{errors["shippingAddress.fullName"]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-[#111827]">
            Mobile Number
          </label>
          <input
            id="phone"
            placeholder="Enter your mobile number"
            value={values.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className={fieldClassName}
          />
          {errors["shippingAddress.phone"] && (
            <p className="text-xs text-destructive">{errors["shippingAddress.phone"]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#111827]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={fieldClassName}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="line1" className="text-sm font-medium text-[#111827]">
            Address
          </label>
          <div className="relative">
            <input
              id="line1"
              placeholder="Enter your address"
              value={values.line1}
              onChange={(e) => onFieldChange("line1", e.target.value)}
              className={cn(fieldClassName, "pr-9")}
            />
            <MapPin className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#DC2626]" />
          </div>
          {errors["shippingAddress.line1"] && (
            <p className="text-xs text-destructive">{errors["shippingAddress.line1"]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="state" className="text-sm font-medium text-[#111827]">
            State
          </label>
          <select
            id="state"
            value={values.state}
            onChange={(e) => onFieldChange("state", e.target.value)}
            className={cn(fieldClassName, "appearance-none")}
          >
            <option value="" disabled>
              Select state
            </option>
            {AU_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors["shippingAddress.state"] && (
            <p className="text-xs text-destructive">{errors["shippingAddress.state"]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="postalCode" className="text-sm font-medium text-[#111827]">
            Post Code
          </label>
          <input
            id="postalCode"
            placeholder="Enter Post Code"
            value={values.postalCode}
            onChange={(e) => onFieldChange("postalCode", e.target.value)}
            className={fieldClassName}
          />
          {errors["shippingAddress.postalCode"] && (
            <p className="text-xs text-destructive">{errors["shippingAddress.postalCode"]}</p>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold text-[#111827]">
            Select a label for effective delivery
          </p>
          <div className="flex gap-3">
            {(["home", "office"] as const).map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onFieldChange("addressLabel", label)}
                className={cn(
                  "rounded-md border px-8 py-2 text-sm font-semibold uppercase",
                  values.addressLabel === label
                    ? "border-[#DC2626] text-[#DC2626]"
                    : "border-gray-300 text-gray-400"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#111827]">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => onSaveAddressChange(e.target.checked)}
            className="size-4 rounded border-gray-300 accent-[#111827]"
          />
          Save delivery address
        </label>
      </div>
    </div>
  );
}
