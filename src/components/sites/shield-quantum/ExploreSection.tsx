"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CardItem {
  eyebrow: string;
  title: string;
  image: string;
  href: string;
}

const recentPosts: CardItem[] = [
  {
    eyebrow: "Research Focus",
    title: "Building superconducting and photonic quantum computer hardware",
    image: "/images/quantum_cryostat_hero.jpg",
    href: "/hardware",
  },
  {
    eyebrow: "Collaboration & Grants",
    title: "SHIELD Research Access & Academic Fellowships",
    image: "/images/quantum_qpu_chip_macro.jpg",
    href: "/collaborate",
  },
  {
    eyebrow: "Quantum Machines",
    title: "Understanding Qubit Superposition & Entanglement Dynamics",
    image: "/images/quantum_cryostat_hero.jpg",
    href: "/quantum-machines",
  },
  {
    eyebrow: "Quantum Security",
    title: "Post-Quantum Cryptography & NIST Lattice Migration",
    image: "/images/quantum_qpu_chip_macro.jpg",
    href: "/security",
  },
];

const resourceItems: CardItem[] = [
  {
    eyebrow: "Knowledge Library",
    title: "Explore hands-on quantum error correction curriculum",
    image: "/images/quantum_qpu_chip_macro.jpg",
    href: "/knowledge",
  },
  {
    eyebrow: "Interactive Lab",
    title: "Cryogenic Dilution Refrigerator Multi-Stage Visualizer",
    image: "/images/quantum_cryostat_hero.jpg",
    href: "/labs/cryogenic",
  },
  {
    eyebrow: "Quantum Simulator",
    title: "Interactive Web-Based Quantum Circuit Builder",
    image: "/images/quantum_qpu_chip_macro.jpg",
    href: "/simulator",
  },
  {
    eyebrow: "Campus Blueprint",
    title: "Discover the SHIELD Quantum 11-Facility Campus Architecture",
    image: "/images/quantum_cryostat_hero.jpg",
    href: "/campus",
  },
];

export function ExploreSection() {
  const [activeTab, setActiveTab] = useState<"recent" | "resources">("recent");

  const cards = activeTab === "recent" ? recentPosts : resourceItems;

  return (
    <section id="news-resources" className="w-full bg-[#202124] text-[#F9F7EF] py-20 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-[#3c4043]/30">
      <div className="max-w-[1296px] mx-auto">
        {/* Section Header & Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#7B7672] block mb-3 font-medium">
              Explore &amp; Discover
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-[#F9F7EF]">
              News &amp; Resources
            </h2>
          </div>

          {/* Pill Tabs */}
          <div className="flex items-center p-1 bg-[#292a2d] border border-[#3c4043] rounded-full w-fit">
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                activeTab === "recent"
                  ? "bg-[#202124] text-[#F9F7EF] border border-[#7B7672]"
                  : "text-[#7B7672] hover:text-[#F9F7EF]"
              }`}
            >
              Recent Research
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                activeTab === "resources"
                  ? "bg-[#202124] text-[#F9F7EF] border border-[#7B7672]"
                  : "text-[#7B7672] hover:text-[#F9F7EF]"
              }`}
            >
              Educational Resources
            </button>
          </div>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="group flex flex-col bg-[#292a2d]/50 border border-[#3c4043] hover:border-[#7B7672] hover:bg-[#292a2d] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#D367C4]/5"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/10] w-full bg-[#202124] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292a2d] via-transparent to-transparent opacity-60" />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#D367C4] block mb-2 font-medium">
                    {card.eyebrow}
                  </span>
                  <h4 className="text-base sm:text-lg font-normal text-[#F9F7EF] group-hover:text-[#D367C4] transition-colors leading-snug line-clamp-3">
                    {card.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B7672] group-hover:text-[#F9F7EF] pt-4 mt-4 border-t border-[#3c4043]/50 transition-colors">
                  <span>Explore research</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D367C4]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
