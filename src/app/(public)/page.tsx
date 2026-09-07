import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Custom prints, made simple.
      </h1>
      <p className="max-w-md text-muted-foreground">
        Shop apparel, accessories, and home goods printed on demand and shipped to your door.
      </p>
      <Button size="lg" render={<Link href="/shop" />}>
        Shop now
      </Button>
    </div>
  )
}
