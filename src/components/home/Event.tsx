import React from "react";

const Event = () => {
  return (
    
    <div className="max-w-[1240px] mx-auto">
      {" "}
      <div className="max-w-[1240px] relative mx-auto overflow-hidden rounded-2xl">
        {/* Decorative Backdrop Vectors - top-left white blur */}
        <div
          className="absolute -top-10 -left-10 rounded-full pointer-events-none z-10"
          style={{
            width: "160px",
            height: "160px",
            backgroundColor: "#FFFFFF",
            opacity: 0.3,
            filter: "blur(24px)",
          }}
        />

        {/* Overlay+Blur - bottom-right gold blur */}
        <div
          className="absolute -bottom-12 -right-12 rounded-full pointer-events-none z-10"
          style={{
            width: "192px",
            height: "192px",
            backgroundColor: "#FCD34D",
            opacity: 0.4,
            filter: "blur(24px)",
          }}
        />

        {/* image container */}
        <div className="relative flex flex-col justify-center items-center">
          <img
            src="/event.jpg"
            alt="Summer bulk sale banner"
            className="w-full h-auto rounded-2xl border border-black/10"
          />

          {/* absolute text container - centered */}
          <div className="max-w-[672px] gap-4 absolute  z-20 flex flex-col items-center justify-center text-center pt-[1px]">
            <div className="bg-[#EF2127] rounded-full text-white text-xs py-1 px-3">
              MELBOURNE WORKSHOP RELOCATION SALE
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl tracking-[-1.2px] text-black">
                SUMMER BULK SALE
              </h2>

              <h1 className="text-4xl md:text-6xl font-black text-[#EF2127] tracking-[-1.2px]">
                UP TO 40% OFF
              </h1>
            </div>

            <div className="max-w-[512px]">
              <p className="text-sm md:text-base text-gray-800  ">
                We&apos;ve moved to 58 Phoenix St, Brunswick! Celebrate with
                tiered wholesale discounts on all AS Colour, Gildan & Organic
                garments.
              </p>
            </div>

            <button className="rounded-[6px] bg-[#EF2127] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-colors text-white text-sm font-semibold tracking-wide uppercase px-6 py-3">
              Shop bulk deals now
            </button>

            {/* carousel dots */}
            <div className="flex items-center gap-[6px] mt-6">
              <span className="w-2 h-2 rounded-full bg-[#FF4800]" />
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="w-2 h-2 rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
