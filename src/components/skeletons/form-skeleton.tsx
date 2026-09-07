import { cn } from "cn"

export function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="w-full max-w-sm space-y-4" aria-hidden="true">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      ))}
      <div className={cn("h-8 w-full animate-pulse rounded-lg bg-muted")} />
    </div>
  )
}
