import Link from "next/link"

export function AuthHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="font-semibold tracking-tight">
          CharlsPrint
        </Link>
      </div>
    </header>
  )
}
