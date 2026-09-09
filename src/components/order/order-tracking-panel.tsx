"use client";

import * as React from "react";
import LogoComp from "@/components/shared/logoComp";
import { orderTrackingSchema, type OrderTrackingInput } from "@/lib/validations/order-tracking";
import { orderService } from "@/services/order.service";
import { ApiClientError } from "@/services/api-client";
import { formatOrderDate } from "@/lib/order-date";
import type { Order, OrderStatus } from "@/types";
import { demoOrders } from "@/app/(public)/order-tracking/_demo-orders";
import { OrderTrackingProgress } from "./order-tracking-progress";
import { OrderTrackingSummary } from "./order-tracking-summary";

const DEMO_ORDER_NUMBER = "96459761";

const STATUS_MESSAGES: Record<OrderStatus, string> = {
  pending: "Your order has been placed and is being prepared.",
  processing: "Your package has been packed and is being handed over to a logistics partner.",
  shipped: "Your package is on the way.",
  "out-for-delivery": "Your package is out for delivery.",
  delivered: "Your package has been delivered.",
  cancelled: "This order has been cancelled.",
};

function statusToStepIndex(status: OrderStatus) {
  switch (status) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "shipped":
    case "out-for-delivery":
      return 2;
    case "delivered":
      return 3;
    default:
      return -1;
  }
}

export function OrderTrackingPanel() {
  const [values, setValues] = React.useState<OrderTrackingInput>({
    orderNumber: DEMO_ORDER_NUMBER,
  });
  const [order, setOrder] = React.useState<Order | null>(demoOrders[DEMO_ORDER_NUMBER] ?? null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(true);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    const result = orderTrackingSchema.safeParse(values);
    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? "Please check the form for errors");
      return;
    }

    setIsSubmitting(true);
    setOrder(null);
    try {
      const found = await orderService.getByNumber(result.data.orderNumber);
      setOrder(found);
    } catch (error) {
      // Order lookups aren't backed by a live API yet, so demo orders keep the
      // tracking flow usable by number in the meantime.
      const demo = demoOrders[result.data.orderNumber.trim()];
      if (demo) {
        setOrder(demo);
      } else {
        setFormError(
          error instanceof ApiClientError
            ? error.message
            : "We couldn't find an order with that number."
        );
      }
    } finally {
      setIsSubmitting(false);
      setHasSearched(true);
    }
  }

  const isCancelled = order?.status === "cancelled";

  return (
    <div className="relative rounded-xl border border-gray-300 p-6 md:p-10">
      <div className="absolute -top-5 left-8 bg-background px-4">
        <LogoComp className="h-9 w-auto" width={140} height={48} />
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="w-full border-b border-gray-100 pb-6 md:w-[38%] md:border-r md:border-b-0 md:pr-8 md:pb-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[#374151] md:text-xl">
                View or Manage Your Order
              </h2>
              <p className="mt-2 text-sm text-[#636363]">
                To check the status of your order, or to start a return, please enter your order
                number.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="orderNumber" className="text-sm font-medium text-[#111827]">
                Order number
              </label>
              <input
                id="orderNumber"
                value={values.orderNumber}
                onChange={(e) => setValues({ orderNumber: e.target.value })}
                placeholder="Enter your order number"
                className="w-full rounded-lg border border-gray-300 bg-[#F5F5F5] px-3 py-2 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus-visible:border-[#DC2626]"
              />
            </div>

            {formError && <p className="text-xs text-destructive">{formError}</p>}

            <button
              type="submit"
              disabled={isSubmitting || !values.orderNumber.trim()}
              className="w-full rounded-lg bg-[#DC2626] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c02121] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Searching..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-[62%]">
          {!hasSearched && !isSubmitting && (
            <p className="text-sm text-[#636363]">
              Enter your order number to see tracking details.
            </p>
          )}

          {isSubmitting && (
            <div className="flex items-center justify-center py-16">
              <div className="size-8 animate-spin rounded-full border-2 border-[#DC2626] border-t-transparent" />
            </div>
          )}

          {!isSubmitting && hasSearched && !order && (
            <p className="text-sm text-[#636363]">
              {formError ?? "We couldn't find that order."}
            </p>
          )}

          {!isSubmitting && order && (
            <>
              {order.estimatedDelivery && !isCancelled && (
                <p className="mb-4 text-sm text-[#636363]">
                  Order expected arrival{" "}
                  <span className="font-semibold text-[#111827]">
                    {formatOrderDate(order.estimatedDelivery)}
                  </span>
                </p>
              )}

              {isCancelled ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-[#DC2626]">
                  {STATUS_MESSAGES.cancelled}
                </div>
              ) : (
                <OrderTrackingProgress currentIndex={statusToStepIndex(order.status)} />
              )}

              <OrderTrackingSummary order={order} statusMessage={STATUS_MESSAGES[order.status]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
