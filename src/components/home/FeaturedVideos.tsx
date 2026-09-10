"use client"
import React, { useState } from "react";
import { VolumeX, Play, ArrowRight } from "lucide-react";

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
    },
    {
      id: 2,
      image: "/video2.jpg",
      title: "500 Tees in 8 Hours",
      category: "SCREEN PRINT",
    },
    {
      id: 3,
      image: "/video3.jpg",
      title: "DTG vs DTF: Which Is Right for You?",
      category: "COMPARISON",
    },
    {
      id: 4,
      image: "/video4.jpg",
      title: "Digitizing Custom Embroidery",
      category: "EMBROIDERY",
    },
    {
      id: 5,
      image: "/video5.jpg",
      title: "Online Studio: Create Your Design",
      category: "ONLINE TOOL",
    },
  ];

  const [activeId, setActiveId] = useState(3);

  return (
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

                  {/* Mute button */}
                  <button
                    type="button"
                    aria-label="Mute video"
                    className="absolute top-3 right-3 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center text-white"
                  >
                    <VolumeX size={12} />
                  </button>

                  {/* Central play overlay */}
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setActiveId(video.id)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play
                        size={16}
                        className="text-black translate-x-[1px]"
                        fill="currentColor"
                      />
                    </span>
                  </button>

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
  );
};

export default FeaturedVideos;