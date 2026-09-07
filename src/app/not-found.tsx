import Link from "next/link"

export default function RootNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h2 className="text-lg font-semibold">Page not found</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Return home
      </Link>
    </div>
  )
}
