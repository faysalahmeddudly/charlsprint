import Image from "next/image";
import { ArrowRight } from 'lucide-react';

export type ProductHome = {
  id: number;
  image: string;
  badge?: "HOT"|"NEW"|"TOP"|null;
  brand: string;
  title: string;
  price: string;
  compare_price: string;
  discount: string;
  available_color: { id: number; hex: string }[];
  
};


export default function ProductCardSm({ product }: { product: ProductHome }) {
  return <div className="p-3 rounded-lg border border-slate-200">
{/* image container */}

<div className="pb-3">

<div className="bg-slate-50 relative">
<div className="absolute top-2.5 left-2.5 flex items-center justify-center text-[9px] font-bold rounded-full text-white h-6 w-6 bg-black">{product?.badge ?? null}</div>
   <img className="object-cover w-full aspect-[260/325]" src={product.image} alt="" />


</div>


</div>

{/* text container */}
<div className="pt-[6.5px] font-dm-sans flex flex-col gap-[2.5px]">

    <div className="font-bold text-slate-400 text-[10px] uppercase">{product.brand}</div>

    <div className="font-bold text-slate-800 text-xs">{product.title}</div>



    <div className="flex items-center">

<h1 className="text-red-600 font-bold">{product.price}</h1>
<h1 className="pl-[6px] text-slate-400 text-xs">{product.compare_price}</h1>
<h1 className="pl-[6px] font-bold text-[10px] text-emerald-600">{product.discount}</h1>

    </div>



<div className="pt-3">

    <div className="border-slate-100 border-t pt-2 flex items-center justify-between">


        <div className="flex items-center gap-1">
            {product?.available_color.map(col=>(
                <div key={col.id} className="h-4 w-4 rounded-full border border-slate-200" style={{ backgroundColor: col.hex }}></div>
            ))}

        </div>




        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
Design Now
<ArrowRight size={14} />
        </div>

    </div>



</div>


</div>



  </div>;
}
