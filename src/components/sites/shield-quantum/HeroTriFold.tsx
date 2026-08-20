"use client";

import React, { useState } from "react";
import Image from "next/image";

export function HeroTriFold() {
  const [videoError, setVideoError] = useState(false);
  const [chipVideoError, setChipVideoError] = useState(false);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen bg-[#202124] text-[#F9F7EF] overflow-hidden flex items-center justify-center pt-16">
      {/* Background Ambient Video with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/coral.jpg"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-70 scale-105 transition-opacity duration-1000"
          >
            <source src="/videos/coral-desktop.mp4" type="video/mp4" />
            <source src="/videos/coral-mobile.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/images/coral.jpg"
              alt="SHIELD Quantum Ambient Background"
              fill
              priority
              className="object-cover opacity-70"
            />
          </div>
        )}
        {/* Subtle radial vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#202124]/40 via-transparent to-[#202124] pointer-events-none" />
      </div>

      {/* Tri-Fold 3-Column Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {/* Left Column: "Discover" */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-normal tracking-[0.04em] uppercase text-[#F9F7EF] leading-none">
            Discover
          </h1>
        </div>

        {/* Center Column: Rotating Quantum Processor Chip + Scroll Anchor */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {!chipVideoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/chip.png"
                onError={() => setChipVideoError(true)}
                className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_35px_rgba(211,103,196,0.3)] scale-110"
              >
                <source src="/videos/chip.webm" type="video/webm" />
                <source src="/videos/chip-desktop.mov" type="video/quicktime" />
              </video>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src="/images/chip.png"
                  alt="SHIELD Quantum Processor Core"
                  fill
                  className="object-contain drop-shadow-[0_0_35px_rgba(211,103,196,0.3)] animate-pulse"
                />
              </div>
            )}
          </div>

          {/* Animated Scroll Anchor Button */}
          <div className="mt-4">
            <a
              href="#mission"
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#F9F7EF]/40 hover:border-[#D367C4] hover:bg-[#D367C4]/10 transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll down to mission section"
            >
              <svg
                className="w-6 h-6 text-[#F9F7EF] group-hover:text-[#D367C4] transition-colors animate-bounce"
                viewBox="0 0 49 50"
                fill="currentColor"
              >
                <path d="M24.5432 31.6353L30.9352 25.2826L29.8515 24.1989L25.3284 28.722V18.3723H23.7186V28.722L19.1956 24.1989L18.1119 25.2826L24.5432 31.6353ZM24.5107 43.3984C21.9777 43.3984 19.5992 42.9163 17.3754 41.952C15.1516 40.9876 13.2038 39.6704 11.5321 38.0002C9.86044 36.3301 8.54199 34.3841 7.57675 32.1624C6.61152 29.9407 6.12891 27.5633 6.12891 25.0303C6.12891 22.4893 6.61106 20.1004 7.57538 17.8635C8.53972 15.6266 9.85697 13.6808 11.5271 12.0261C13.1973 10.3715 15.1432 9.06152 17.3649 8.09629C19.5866 7.13105 21.964 6.64844 24.4971 6.64844C27.038 6.64844 29.4269 7.13059 31.6638 8.09491C33.9007 9.05925 35.8465 10.368 37.5012 12.0211C39.1559 13.6743 40.4658 15.6182 41.4311 17.853C42.3963 20.0878 42.8789 22.4757 42.8789 25.0166C42.8789 27.5497 42.3968 29.9281 41.4324 32.1519C40.4681 34.3757 39.1594 36.3235 37.5062 37.9952C35.8531 39.6669 33.9007 40.9854 31.6743 41.9506C29.4395 42.9158 27.0517 43.3984 24.5107 43.3984ZM24.5039 41.8279C29.1788 41.8279 33.1483 40.1939 36.4123 36.9259C39.6764 33.658 41.3084 29.6905 41.3084 25.0234C41.3084 20.3485 39.6764 16.3791 36.4123 13.115C33.1483 9.85096 29.1788 8.21894 24.5039 8.21894C19.8369 8.21894 15.8694 9.85096 12.6014 13.115C9.3334 16.3791 7.69941 20.3485 7.69941 25.0234C7.69941 29.6905 9.3334 33.658 12.6014 36.9259C15.8694 40.1939 19.8369 41.8279 24.5039 41.8279Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: "SHIELD QUANTUM MACHINE AND TECHNOLOGY" */}
        <div className="w-full lg:w-1/3 text-center lg:text-right">
          <h2 className="text-2xl sm:text-4xl xl:text-5xl font-normal tracking-[0.03em] uppercase text-[#F9F7EF] leading-tight">
            SHIELD QUANTUM
            <span className="block text-lg sm:text-2xl xl:text-3xl text-[#D367C4] mt-1 font-light tracking-[0.06em]">
              MACHINE &amp; TECHNOLOGY
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
