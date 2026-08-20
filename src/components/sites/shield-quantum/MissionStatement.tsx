"use client";

import React from "react";

export function MissionStatement() {
  return (
    <section id="mission" className="w-full bg-[#202124] text-[#F9F7EF] py-24 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-[#3c4043]/30">
      <div className="max-w-[1296px] mx-auto">
        <div className="flex flex-col items-start max-w-4xl">
          <span className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#7B7672] uppercase mb-8 sm:mb-12">
            mission
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.03em] leading-[1.1] text-[#F9F7EF]">
            <span className="block">Building quantum</span>
            <span className="block">computing for otherwise</span>
            <span className="block">unsolvable problems</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
