import Banner from "@/components/home/Banner";
import BestProduct from "@/components/home/BestProduct";
import Event from "@/components/home/Event";
import ProperCustomAperal from "@/components/home/ProperCustomAperal";
import ShopCategory from "@/components/home/ShopCategory";

export default function HomePage() {
  return (
    <div className=" ">
      <Banner />
      <Event />
      <ShopCategory />
      <ProperCustomAperal />
      <BestProduct />

      

      <div className=""></div>
    </div>
  );
}
