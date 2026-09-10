import Image from "next/image"

export function SidebarBanners() {
  return (
    <>
      <div className="mt-8 w-full">
        <div className="relative aspect-[298/385] overflow-hidden rounded-md">
          <Image
            src="/asColorExample.jpg"
            alt="Featured print collection"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="relative aspect-[199/713] overflow-hidden rounded-md">
          <Image
            src="/event.jpg"
            alt="Seasonal drop"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  )
}
