import Link from "next/link"

export default function AuthNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-semibold">Page not found</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        That authentication page doesn&apos;t exist.
      </p>
      <Link href="/login" className="text-sm underline underline-offset-4">
        Go to sign in
      </Link>
    </div>
  )
}
