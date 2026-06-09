"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { Skill } from "@/lib/portfolio-data";
import { skills, stats } from "@/lib/portfolio-data";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SkillSolarSystem = dynamic(
  () => import("@/components/scene/SkillSolarSystem").then((module) => module.SkillSolarSystem),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] rounded-[1.5rem] border border-white/10 bg-white/[0.035] sm:h-[460px] lg:h-[680px]" />
    ),
  },
);

type HeroSectionProps = {
  selectedSkill: Skill;
  onSelectSkill: (skill: Skill) => void;
  reducedMotion: boolean;
};

export function HeroSection({ selectedSkill, onSelectSkill, reducedMotion }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pt-28 sm:pt-32 md:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          className="relative z-10"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-pill mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-emerald-200 sm:mb-8 sm:px-5 sm:py-3">
            <span>👋</span>
            Hi, I&apos;m Laxita Singh
          </div>
          <h1 className="max-w-4xl text-balance text-[clamp(2.8rem,15vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white sm:leading-[0.9] lg:tracking-[-0.045em]">
            I build interactive <span className="gradient-text">web experiences</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/66 sm:mt-7 sm:text-xl sm:leading-9">
            Frontend-focused full-stack developer crafting fast, accessible, cinematic interfaces with modern
            technologies and thoughtful product engineering.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <MagneticButton variant="primary" href="#projects">
              Explore my work
            </MagneticButton>
            <MagneticButton href="#contact">Contact me</MagneticButton>
          </div>
          <div className="mt-9 sm:mt-12">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/40 sm:mb-4 sm:text-sm">Tech stack</p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3" id="skills">
              {skills.slice(0, 8).map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => onSelectSkill(skill)}
                  className="tech-chip"
                  style={{ "--chip-color": skill.accent } as React.CSSProperties}
                  aria-pressed={selectedSkill.id === skill.id}
                >
                  {skill.icon}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SkillSolarSystem selectedSkill={selectedSkill} onSelect={onSelectSkill} reducedMotion={reducedMotion} />
        </motion.div>
      </div>

      <div className="mx-auto mt-6 grid max-w-[1500px] grid-cols-2 gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-2xl sm:mt-8 sm:gap-4 sm:rounded-[1.5rem] sm:p-4 lg:w-[min(720px,48vw)] lg:grid-cols-4 lg:translate-x-[38%]">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 px-3 py-3 text-center sm:px-5 sm:py-4">
            <strong className="block text-2xl text-white sm:text-3xl">{stat.value}</strong>
            <span className="mt-1 block text-xs text-white/50 sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-7 flex max-w-[1500px] items-center gap-3 pb-10 text-sm text-white/46 sm:mt-8 sm:text-base">
        <span className="grid h-9 w-5 place-items-center rounded-full border border-emerald-300/40 text-emerald-200">↓</span>
        Scroll to explore
      </div>
    </section>
  );
}
