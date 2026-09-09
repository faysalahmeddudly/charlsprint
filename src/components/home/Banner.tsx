"use client";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const slides = [
  {
    label: "PREMIUM AS COLOUR & APPAREL",
    heading: "TRANSFORM YOUR IDEAS INTO",
    highlight: "PRINTED REALITY",
    description:
      "Melbourne’s leading direct-to-garment & screen printing specialists. Rapid turnarounds, retail quality, and zero minimum order requirements.",
    image: "/bannerImage.png",
  },
  {
    label: "PREMIUM AS COLOUR & APPAREL",
    heading: "TRANSFORM YOUR IDEAS INTO",
    highlight: "PRINTED REALITY",
    description:
      "Melbourne's leading direct-to-garment & screen printing specialists. Rapid turnarounds, retail quality, and zero minimum order requirements.",
    image: "/bannerImage.png",
  },
];

const Banner = () => {
  const swiperElRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperElRef.current) return;

    swiperInstance.current = new Swiper(swiperElRef.current, {
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".banner-pagination",
        clickable: true,
      },
    });

    return () => {
      swiperInstance.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto">
      <div className=" py-12 relative">
        <div ref={swiperElRef} className="swiper">
          <div className="swiper-wrapper">
            {slides.map((slide, index) => (
              <div className="swiper-slide" key={index}>
                <div className="grid grid-cols-2  gap-8">
                  {/* text container */}
                  <div className="max-w-[498px] pt-[7px] flex flex-col gap-5">
                    <div className="text-xs font-bold font-dm-sans text-[#475569] tracking-[0.6px]">
                      {slide.label}
                    </div>

                    <div className="flex flex-col text-5xl text-[#0F172A] tracking-[-1.2px]">
                      <span>{slide.heading}</span>
                      <span className="-mt-2 font-arial font-bold text-[#EF242B]">
                        {slide.highlight}
                      </span>
                    </div>

                    <div className="text-base text-[#475569]">
                      {slide.description}
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <button className="border bg-[#EF242B] py-3.5 px-5 rounded-[6px] text-white border-[#CBD5E1] flex items-center gap-2">
                        Start Designing Now
                        <span>&rarr;</span>
                      </button>
                      <button className="border py-3.5 px-5 rounded-[6px] text-[#334155] border-[#CBD5E1]">
                        Explore Product
                      </button>
                    </div>

                    {/* pagination dots — single element outside the slides so it doesn't scroll with them */}
                    <div
                      className="banner-pagination absolute left-0 bottom-4 !w-auto flex gap-2
                [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5
                [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:cursor-pointer"
                    ></div>
                  </div>

                  {/* image container */}
                  <div className="relative max-w-[710px] rounded-[12px] bg-white shadow-[0px_4px_10px_0px_#0000000D] overflow-hidden">
                    <img
                      src={slide.image}
                      alt="Printed t-shirt example"
                      className="w-full max-h-[425px] object-cover"
                    />
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 ml-1 text-[#0F172A]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
