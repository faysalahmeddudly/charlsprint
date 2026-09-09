"use client";

import * as React from "react";
import Image from "next/image";
import { formatOrderDateTime } from "@/lib/order-date";
import type { Order } from "@/types";

export function OrderTrackingSummary({
  order,
  statusMessage,
}: {
  order: Order;
  statusMessage: string;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const dateLabel = formatOrderDateTime(order.createdAt);

  return (
    <div className="mt-5 rounded-xl bg-[#F5F5F5] p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-[#111827]">#{order.number}</p>
          <p className="mt-1 text-xs text-[#636363]">
            {dateLabel} &nbsp;·&nbsp; {statusMessage}
          </p>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap text-[#DC2626]">
          ${order.total.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 text-sm font-medium text-[#DC2626] hover:underline"
      >
        {expanded ? "View Less" : "View More"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.variantId ?? ""}`} className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded bg-white">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#111827]">{item.name}</p>
                <p className="text-xs text-[#636363]">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold whitespace-nowrap text-[#111827]">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
