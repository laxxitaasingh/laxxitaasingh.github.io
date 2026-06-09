"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/MagneticButton";

const filters = ["All", "Frontend", "Full-stack", "AI"];

const ProjectsGalaxy = dynamic(
  () => import("@/components/scene/ProjectsGalaxy").then((module) => module.ProjectsGalaxy),
  {
    ssr: false,
    loading: () => <div className="h-[560px] rounded-[2rem] border border-white/10 bg-white/[0.035]" />,
  },
);

export function StorySection() {
  return (
    <section id="about" className="relative px-4 py-28 md:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <motion.p
          className="text-sm uppercase tracking-[0.32em] text-cyan-200/70"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
        >
          Cinematic engineering
        </motion.p>
        <motion.h2
          className="text-balance text-[clamp(2.7rem,6vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
        >
          Product interfaces with depth, rhythm, and technical restraint.
        </motion.h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-[1320px] gap-5 md:grid-cols-3">
        {[
          "I combine frontend polish with full-stack awareness, so the UI feels premium while staying maintainable.",
          "The experience uses spring motion, shader-driven surfaces, glass panels, and responsive fallbacks.",
          "Every section is static-export compatible, accessible, keyboard-aware, and designed for GitHub Pages.",
        ].map((copy) => (
          <motion.div
            key={copy}
            className="glass-panel rounded-[1.5rem] border border-white/10 p-6 text-lg leading-8 text-white/64"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            {copy}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-4 py-28 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-violet-200/70">Projects galaxy</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              Floating project worlds with live detail focus.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/62 transition hover:border-cyan-300/40 hover:text-white">
                {filter}
              </button>
            ))}
          </div>
        </div>
        <ProjectsGalaxy />
      </div>
    </section>
  );
}


export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-28 md:px-8">
      <div className="glass-panel mx-auto grid max-w-[1320px] gap-10 rounded-[2rem] border border-white/10 p-8 md:p-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-amber-200/70">Contact</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
            Let&apos;s build a precise, polished web experience.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Send project context, timeline, or collaboration details and I will respond with the clearest next step.
          </p>
        </div>
        <div className="grid gap-4">
          <MagneticButton variant="primary" href="mailto:laxitasingh2112@gmail.com">
            Email me
          </MagneticButton>
          <MagneticButton href="https://github.com/laxxitaasingh" target="_blank" rel="noreferrer">
            GitHub
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/laxita-singh-b72299213/" target="_blank" rel="noreferrer">
            LinkedIn
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
