import Image from "next/image"

export function ShopSponsoredBanner() {
  return (
    <div className="mb-8">
      <div className="relative aspect-[1913/328] overflow-hidden rounded-md">
        <Image
          src="/bannerImage.png"
          alt="Shop promotion"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
