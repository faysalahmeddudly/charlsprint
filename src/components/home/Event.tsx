import React from 'react';

const Event = () => {
    return (
        <div className="max-w-[1240px] relative mx-auto overflow-hidden rounded-2xl">

            {/* Decorative Backdrop Vectors - top-left white blur */}
            <div
                className="absolute -top-10 -left-10 rounded-full pointer-events-none z-10"
                style={{
                    width: '160px',
                    height: '160px',
                    backgroundColor: '#FFFFFF',
                    opacity: 0.3,
                    filter: 'blur(24px)',
                }}
            />

            {/* Overlay+Blur - bottom-right gold blur */}
            <div
                className="absolute -bottom-12 -right-12 rounded-full pointer-events-none z-10"
                style={{
                    width: '192px',
                    height: '192px',
                    backgroundColor: '#FCD34D',
                    opacity: 0.4,
                    filter: 'blur(24px)',
                }}
            />

            {/* image container */}
            <div className="relative">
                <img
                    src=""
                    alt="Summer bulk sale banner"
                    className="w-full h-auto rounded-2xl border border-black/10"
                />

                {/* absolute text container - centered */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                    <span className="bg-red-600 text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-4">
                        Melbourne Workshop Relocation Sale
                    </span>

                    <h2 className="text-3xl md:text-4xl font-semibold text-black">
                        Summer Bulk Sale
                    </h2>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-red-600 leading-tight">
                        Up to 40% off
                    </h1>

                    <p className="text-sm md:text-base text-gray-800 max-w-md mt-3 mb-6">
                        We've moved to 58 Phoenix St, Brunswick! Celebrate with tiered
                        wholesale discounts on all AS Colour, Gildan and Organic garments.
                    </p>

                    <button className="bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-semibold tracking-wide uppercase px-6 py-3 rounded-md">
                        Shop bulk deals now
                    </button>

                    {/* carousel dots */}
                    <div className="flex items-center gap-2 mt-6">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="w-2 h-2 rounded-full bg-white/70" />
                        <span className="w-2 h-2 rounded-full bg-white/70" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Event;