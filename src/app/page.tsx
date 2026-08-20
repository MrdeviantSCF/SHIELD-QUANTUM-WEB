import React from "react";
import { HeroTriFold } from "@/components/sites/shield-quantum/HeroTriFold";
import { MissionStatement } from "@/components/sites/shield-quantum/MissionStatement";
import { FeaturedCarousel } from "@/components/sites/shield-quantum/FeaturedCarousel";
import { FounderSection } from "@/components/sites/shield-quantum/FounderSection";
import { RoadmapSection } from "@/components/sites/shield-quantum/RoadmapSection";
import { ExploreSection } from "@/components/sites/shield-quantum/ExploreSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col font-display">
      {/* 1. Hero Tri-Fold with ambient video and quantum core media */}
      <HeroTriFold />

      {/* 2. Staggered Mission Statement */}
      <MissionStatement />

      {/* 3. Featured Breakthroughs Carousel (AEGIS-1, Quantum Echoes) */}
      <FeaturedCarousel />

      {/* 4. Founder & Leadership with Education & Quantum Technology Focus */}
      <FounderSection />

      {/* 5. Interactive 6-Milestone Roadmap */}
      <RoadmapSection />

      {/* 6. News & Resources (Recent Posts & Educational Resources) */}
      <ExploreSection />
    </main>
  );
}
