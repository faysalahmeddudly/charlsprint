"use client";
import React, { useState } from "react";
import { VolumeX, ArrowRight } from "lucide-react";

const ACTIVE_BORDER_COLOR = "#DC2626";
const ACTIVE_BORDER_WIDTH = 2; // recommended: 2px keeps the highlight visible without overpowering the 24px card radius

const FeaturedVideos = () => {
  // feature now as image use mentioned do not removed
  const videos = [
    {
      id: 1,
      image: "/video1.jpg",
      title: "Direct-to-Garment Printing",
      category: "DTG PRINTING",
      badge: "WHICH BLANK?",
    },
    {
      id: 2,
      image: "/video2.jpg",
      title: "500 Tees in 8 Hours",
      category: "SCREEN PRINT",
      badge: "WHICH BLANK?",
    },
    {
      id: 3,
      image: "/video3.jpg",
      title: "DTG vs DTF: Which Is Right for You?",
      category: "COMPARISON",
      badge: "WHICH BLANK?",
    },
    {
      id: 4,
      image: "/video4.jpg",
      title: "Digitizing Custom Embroidery",
      category: "EMBROIDERY",
      badge: "WHICH BLANK?",
    },
    {
      id: 5,
      image: "/video5.jpg",
      title: "Online Studio: Create Your Design",
      category: "ONLINE TOOL",
      badge: "WHICH BLANK?",
    },
  ];

  const [activeId, setActiveId] = useState(3);

  return (
    <div className="border bg-[#FDE7E7] border-t-[#FDE68A] border-b-[#FDE68A]">
      <div className="py-14">
        <div className="max-w-[1280px] mx-auto flex flex-col px-8 font-dm-sans">
          {/* Header */}
          <div className="text-center flex items-center flex-col gap-1 justify-center">
            <h1 className="text-[#0F172A] text-3xl font-bold tracking-[-0.75px]">
              FEATURED IN VIDEOS & PRINT TUTORIALS
            </h1>

            <h1 className="text-xs text-[#475569]">
              Peek inside our Melbourne factory & master custom apparel printing
            </h1>
          </div>

          {/* Videos */}
          <div className="flex items-center gap-4 justify-between mt-8">
            {videos.map((video) => {
              const isActive = video.id === activeId;

              return (
                <div
                  key={video.id}
                  className="overflow-hidden rounded-[24px] flex-1 min-w-0"
                  style={{
                    border: `${ACTIVE_BORDER_WIDTH}px solid ${
                      isActive ? ACTIVE_BORDER_COLOR : "transparent"
                    }`,
                  }}
                >
                  {/* here is the card design just here replace */}
                  <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]">
                    {/* Video Image */}
                    <img
                      src={video.image}
                      alt={video.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
                      }}
                    />

                    {/* Badge */}
                    {isActive && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-[4px] border border-white/20 bg-black/80 py-0.5 px-3">
                        <span className="font-dm-sans font-bold text-[10px] leading-[15px] tracking-[1px] uppercase text-white">
                          {video.badge}
                        </span>
                      </div>
                    )}

                    {/* Mute button */}
                    <button
                      type="button"
                      aria-label="Mute video"
                      className="absolute top-3 right-3 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center text-white"
                    >
                      <VolumeX size={12} />
                    </button>

                    {/* Central play overlay */}
                    {isActive && (
                      <button
                        type="button"
                        aria-label="Play video"
                        onClick={() => setActiveId(video.id)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg
                          width="68"
                          height="68"
                          viewBox="0 0 68 68"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="12"
                            y="2"
                            width="44"
                            height="44"
                            rx="22"
                            fill="#DC2626"
                          />
                          <g filter="url(#filter0_dd_61_23031)">
                            <rect
                              x="12"
                              y="2"
                              width="44"
                              height="44"
                              rx="22"
                              fill="white"
                              fillOpacity="0.01"
                              shapeRendering="crispEdges"
                            />
                          </g>
                          <path
                            d="M31.3 16.841C30.8378 16.5496 30.2538 16.5326 29.7754 16.7965C29.297 17.0605 28.9999 17.5636 29 18.11V29.89C28.9999 30.4364 29.297 30.9396 29.7754 31.2035C30.2538 31.4675 30.8378 31.4504 31.3 31.159L40.644 25.269C41.0798 24.9943 41.3442 24.5152 41.3442 24C41.3442 23.4848 41.0798 23.0057 40.644 22.731L31.3 16.84V16.841Z"
                            fill="white"
                          />
                          <defs>
                            <filter
                              id="filter0_dd_61_23031"
                              x="0"
                              y="0"
                              width="68"
                              height="68"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feMorphology
                                radius="4"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect1_dropShadow_61_23031"
                              />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="3" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_61_23031"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feMorphology
                                radius="3"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect2_dropShadow_61_23031"
                              />
                              <feOffset dy="10" />
                              <feGaussianBlur stdDeviation="7.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="effect1_dropShadow_61_23031"
                                result="effect2_dropShadow_61_23031"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_61_23031"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </button>
                    )}

                    {/* Bottom preview banner */}
                    <div className="absolute inset-x-3 bottom-3 rounded flex items-center justify-between gap-2 px-2 py-2 bg-white/95 backdrop-blur-sm">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-semibold leading-tight text-red-600 truncate">
                          {video.category}
                        </span>
                        <span className="text-[13px] font-medium leading-tight text-black truncate">
                          {video.title}
                        </span>
                      </div>
                      <ArrowRight size={16} className="shrink-0 text-black" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideos;
