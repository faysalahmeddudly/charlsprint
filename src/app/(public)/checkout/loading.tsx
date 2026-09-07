import { FormSkeleton } from "@/components/skeletons/form-skeleton"

export default function CheckoutLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-32 animate-pulse rounded bg-muted" />
      <FormSkeleton fields={6} />
    </div>
  )
}
