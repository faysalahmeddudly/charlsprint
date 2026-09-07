"use client"

import { Button } from "@/components/ui/button"

export default function AuthError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-semibold">Authentication error</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {error.message || "We couldn't complete that request. Please try again."}
      </p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  )
}
