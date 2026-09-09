import { garments } from "@/app/(public)/shop/_data";
import { GarmentExploreCard } from "@/components/shop/garment-explore-card";

export function RecentlyExploredSection() {
  if (garments.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-center text-2xl font-bold text-[#111827]">Recently explored</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {garments.map((garment) => (
          <GarmentExploreCard key={garment.id} garment={garment} />
        ))}
      </div>
    </section>
  );
}
