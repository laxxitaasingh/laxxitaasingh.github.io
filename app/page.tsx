"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/sections/HeroSection";
import {  ContactSection, ProjectsSection, StorySection } from "@/components/sections/PortfolioSections";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { SiteNav } from "@/components/ui/SiteNav";
import { useLenis } from "@/hooks/use-lenis";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { skills } from "@/lib/portfolio-data";

export default function Home() {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    if (!reducedMotion) {
      gsap.utils.toArray<HTMLElement>("[data-cinema]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 80, opacity: 0.25, filter: "blur(16px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "top 45%",
              scrub: 0.7,
            },
          },
        );
      });
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <>
      <CursorGlow />
      <div className="site-aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main>
        <HeroSection selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} reducedMotion={reducedMotion} />
        <div data-cinema>
          <StorySection />
        </div>
        <div data-cinema>
          <ProjectsSection />
        </div>
        <ContactSection />
      </main>
    </>
  );
}
