import { Fragment } from "react";
import { Check, ClipboardList, Handshake, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Order Placed", Icon: ClipboardList, color: "#16A34A" },
  { label: "Packaging", Icon: Package, color: "#F87171" },
  { label: "On The Road", Icon: Truck, color: "#F87171" },
  { label: "Delivered", Icon: Handshake, color: "#F87171" },
];

export function OrderTrackingProgress({ currentIndex }: { currentIndex: number }) {
  return (
    <div>
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFilled = isDone || isCurrent;

          return (
            <Fragment key={step.label}>
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full border-[3px] border-[#EF252C] md:size-14",
                  isFilled ? "bg-[#EF252C]" : "bg-white"
                )}
              >
                {isDone && <Check className="size-4 text-white md:size-5" strokeWidth={3} />}
              </div>

              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-2 flex-1 rounded-full",
                    i < currentIndex ? "bg-[#EF252C]" : "bg-gray-200"
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((step, i) => {
          const reached = i <= currentIndex;
          const Icon = step.Icon;
          return (
            <div key={step.label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="size-6 md:size-7" style={{ color: step.color }} strokeWidth={1.5} />
              <span
                className={cn(
                  "text-[11px] font-medium md:text-sm",
                  reached ? "text-[#111827]" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
