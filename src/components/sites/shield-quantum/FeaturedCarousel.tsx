"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  ctas: { label: string; href: string }[];
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: "Featured Breakthrough",
    title: "Verifiable quantum advantage towards real-world applications",
    body: "Marking a critical step toward real-world utility, our research models demonstrate scalable benchmarking on superconducting planar architectures, establishing verifiable quantum advantage thresholds beyond classical supercomputers.",
    imageSrc: "/images/quantum_cryostat_hero.jpg",
    ctas: [
      {
        label: "Quantum Algorithms",
        href: "/quantum-machines#algorithms",
      },
      {
        label: "Circuit Simulator",
        href: "/simulator",
      },
      {
        label: "Technical Brief",
        href: "/knowledge",
      },
    ],
  },
  {
    id: 2,
    eyebrow: "Next-Gen Processor Architecture",
    title: "SHIELD AEGIS QPU: Scalable Fault-Tolerant Processor Design",
    body: "The SHIELD AEGIS quantum chip represents our physical and theoretical blueprint for high-coherence planar transmon qubits, low-crosstalk microwave control routing, and integrated surface-code error correction.",
    imageSrc: "/images/quantum_qpu_chip_macro.jpg",
    ctas: [
      {
        label: "Hardware Stack",
        href: "/hardware",
      },
      {
        label: "Cryogenic Lab",
        href: "/labs/cryogenic",
      },
      {
        label: "Roadmap Milestones",
        href: "/roadmap",
      },
    ],
  },
];

export function FeaturedCarousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];

  // Auto advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#202124] text-[#F9F7EF] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-[#3c4043]/40 relative overflow-hidden">
      <div className="max-w-[1296px] mx-auto">
        {/* Main Slide Card Container */}
        <div className="bg-[#292a2d] border border-[#3c4043] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left/Content Side (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D367C4] block mb-3 font-medium">
                  {activeSlide.eyebrow}
                </span>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F9F7EF] mb-4 leading-tight">
                  {activeSlide.title}
                </h3>

                <p className="text-sm sm:text-base text-[#dadce0] font-light leading-relaxed mb-8">
                  {activeSlide.body}
                </p>
              </div>

              {/* Action Buttons & Navigation Indicators */}
              <div>
                <div className="flex flex-wrap gap-3 mb-8">
                  {activeSlide.ctas.map((cta, index) => (
                    <Link
                      key={index}
                      href={cta.href}
                      className={
                        index === 0
                          ? "btn-primary text-xs flex items-center gap-1.5"
                          : "btn-secondary text-xs flex items-center gap-1.5"
                      }
                    >
                      <span>{cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>

                {/* Progress Indicator Dots */}
                <div className="flex items-center gap-3">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlideIndex === index
                          ? "w-8 bg-[#D367C4]"
                          : "w-2 bg-[#7B7672] hover:bg-[#F9F7EF]"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right/Visual Side (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full bg-[#18191c] order-1 lg:order-2 overflow-hidden">
              <Image
                src={activeSlide.imageSrc}
                alt={activeSlide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#292a2d] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
