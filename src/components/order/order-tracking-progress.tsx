import { ClipboardList, Home, PackageCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Order Placed", Icon: ClipboardList },
  { label: "Packaging", Icon: PackageCheck },
  { label: "On the Road", Icon: Truck },
  { label: "Delivered", Icon: Home },
];

export function OrderTrackingProgress({ currentIndex }: { currentIndex: number }) {
  const fillPct =
    currentIndex < 0
      ? 0
      : currentIndex >= steps.length - 1
        ? 100
        : ((currentIndex + 0.5) / (steps.length - 1)) * 100;

  return (
    <div>
      <div className="relative h-[3px] w-full rounded-full bg-gray-200">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#DC2626] transition-all"
          style={{ width: `${fillPct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {steps.map((step, i) => (
            <span
              key={step.label}
              className={cn(
                "size-3 rounded-full border-2 bg-white",
                i <= currentIndex ? "border-[#DC2626] bg-[#DC2626]" : "border-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((step, i) => {
          const done = i <= currentIndex;
          const Icon = step.Icon;
          return (
            <div key={step.label} className="flex flex-col items-center gap-2 text-center">
              <Icon className={cn("size-5", done ? "text-[#DC2626]" : "text-gray-300")} />
              <span
                className={cn(
                  "text-[11px] font-medium md:text-xs",
                  done ? "text-[#DC2626]" : "text-gray-400"
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
