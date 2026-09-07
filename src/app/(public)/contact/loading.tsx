import { FormSkeleton } from "@/components/skeletons/form-skeleton"

export default function ContactLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded bg-muted" />
      </div>
      <FormSkeleton fields={4} />
    </div>
  )
}
