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
    loading: () => <div className="h-[620px] rounded-[2rem] border border-white/10 bg-white/[0.035]" />,
  },
);

type HeroSectionProps = {
  selectedSkill: Skill;
  onSelectSkill: (skill: Skill) => void;
  reducedMotion: boolean;
};

export function HeroSection({ selectedSkill, onSelectSkill, reducedMotion }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pt-32 md:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          className="relative z-10"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-pill mb-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-emerald-200">
            <span>👋</span>
            Hi, I&apos;m Laxita Singh
          </div>
          <h1 className="max-w-4xl text-balance text-[clamp(3.4rem,8vw,7.7rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
            I build interactive <span className="gradient-text">web experiences</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-white/66">
            Frontend-focused full-stack developer crafting fast, accessible, cinematic interfaces with modern
            technologies and thoughtful product engineering.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton variant="primary" href="#projects">
              Explore my work
            </MagneticButton>
            <MagneticButton href="#contact">Contact me</MagneticButton>
          </div>
          <div className="mt-12">
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/40">Tech stack</p>
            <div className="flex flex-wrap gap-3" id="skills">
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

      <div className="mx-auto mt-8 grid max-w-[1500px] gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-2xl sm:grid-cols-2 lg:w-[min(720px,48vw)] lg:grid-cols-4 lg:translate-x-[38%]">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 px-5 py-4 text-center">
            <strong className="block text-3xl text-white">{stat.value}</strong>
            <span className="mt-1 block text-sm text-white/50">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-[1500px] items-center gap-3 pb-10 text-white/46">
        <span className="grid h-9 w-5 place-items-center rounded-full border border-emerald-300/40 text-emerald-200">↓</span>
        Scroll to explore
      </div>
    </section>
  );
}
