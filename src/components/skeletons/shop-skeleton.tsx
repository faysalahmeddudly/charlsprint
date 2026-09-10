import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"

export function ShopSkeleton() {
  return (
    <section className="w-full bg-white px-4 py-4 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1216px]">
        <div className="flex gap-6">
          <aside className="hidden w-55 shrink-0 md:block" aria-hidden="true">
            <div className="h-40 animate-pulse rounded-md bg-muted" />
            <div className="mt-4 h-40 animate-pulse rounded-md bg-muted" />
            <div className="mt-8 aspect-[298/385] animate-pulse rounded-md bg-muted" />
            <div className="mt-5 aspect-[199/713] animate-pulse rounded-md bg-muted" />
          </aside>

          <div className="flex-1">
            <div className="mb-8 aspect-[1913/328] animate-pulse rounded-md bg-muted" />

            <div className="mb-2 flex items-center justify-between">
              <div className="h-8 w-40 animate-pulse rounded bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-4 w-2/3 max-w-sm animate-pulse rounded bg-muted" />

            <div className="mt-5">
              <ProductGridSkeleton items={12} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
