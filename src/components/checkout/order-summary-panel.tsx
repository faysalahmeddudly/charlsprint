"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PaymentMethodsGrid } from "./payment-methods-grid";
import type { Cart } from "@/types";

const DEMO_COUPONS: Record<string, number> = {
  WELCOME10: 0.1,
};

export function OrderSummaryPanel({
  cart,
  onPlaceOrder,
  isSubmitting,
  formError,
}: {
  cart: Cart;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
  formError: string | null;
}) {
  const [couponCode, setCouponCode] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; rate: number } | null>(
    null
  );
  const [couponError, setCouponError] = React.useState<string | null>(null);

  const discount = appliedCoupon ? cart.subtotal * appliedCoupon.rate : 0;
  const total = cart.subtotal - discount;

  function handleApplyCoupon() {
    const rate = DEMO_COUPONS[couponCode.trim().toUpperCase()];
    if (!rate) {
      setCouponError("Invalid or expired coupon code");
      setAppliedCoupon(null);
      return;
    }
    setCouponError(null);
    setAppliedCoupon({ code: couponCode.trim().toUpperCase(), rate });
  }

  return (
    <div className="w-full space-y-6 rounded-md bg-[#F5F5F5] p-6 md:w-[45%]">
      <div>
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Payment Method</h2>
        <PaymentMethodsGrid />
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold text-[#111827]">Order summary</h2>

        {cart.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId ?? ""}`}
                className="flex justify-between text-sm"
              >
                <span className="text-[#636363]">
                  {item.name} ({item.quantity} pcs)
                </span>
                <span className="font-semibold text-[#111827]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        {appliedCoupon && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="font-semibold text-[#16A34A]">Discount ({appliedCoupon.code})</span>
            <span className="font-semibold text-[#16A34A]">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="mt-4 rounded-md bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#636363]">Total (ex. shipping):</span>
            <span className="text-2xl font-bold text-[#DC2626]">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Your Coupon Code"
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400"
          />
          <Button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-[#DC2626] hover:bg-[#c02121]"
          >
            Apply
          </Button>
        </div>
        {couponError && <p className="mt-1 text-xs text-destructive">{couponError}</p>}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#636363]">Total</span>
          <span className="text-lg font-bold text-[#111827]">${total.toFixed(2)}</span>
        </div>

        {formError && <p className="mt-2 text-sm text-destructive">{formError}</p>}

        <Button
          type="button"
          onClick={onPlaceOrder}
          disabled={isSubmitting || cart.items.length === 0}
          className="mt-4 w-full rounded-md bg-[#DC2626] py-5 font-bold text-white hover:bg-[#c02121]"
        >
          {isSubmitting ? "Placing order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
