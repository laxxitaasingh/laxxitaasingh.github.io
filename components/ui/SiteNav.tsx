"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CommandPalette } from "./CommandPalette";
import { MagneticButton } from "./MagneticButton";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [aurora, setAurora] = useState(false);
  const [sound, setSound] = useState(false);

  const toggleTheme = () => {
    setAurora((value) => {
      document.documentElement.dataset.theme = value ? "dark" : "aurora";
      return !value;
    });
  };

  return (
    <motion.header
      className="fixed left-1/2 top-3 z-40 flex w-[min(calc(100%_-_0.75rem),1440px)] -translate-x-1/2 items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:top-5 sm:rounded-full sm:px-4 sm:py-3 md:px-6"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#home" className="flex min-w-0 items-center gap-2 text-white sm:gap-3" aria-label="Laxita Singh home">
        <span className="truncate text-xs font-semibold uppercase tracking-[0.32em] sm:text-sm sm:tracking-[0.55em]">Laxita</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
      </a>

      <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative rounded-full px-5 py-2 text-sm text-white/62 transition hover:text-white"
          >
            {item.label}
            {index === 0 ? (
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300" />
            ) : null}
          </a>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <CommandPalette />
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/75 transition hover:border-violet-300/40 hover:text-white sm:h-11 sm:w-11 sm:text-base"
          onClick={() => setSound((value) => !value)}
          aria-label={sound ? "Disable sound effects" : "Enable sound effects"}
          title={sound ? "Sound on" : "Sound off"}
        >
          {sound ? "♪" : "∿"}
        </button>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/75 transition hover:border-cyan-300/40 hover:text-white sm:h-11 sm:w-11 sm:text-base"
          onClick={toggleTheme}
          aria-label="Toggle accent theme"
          title="Toggle accent theme"
        >
          {aurora ? "☀" : "☾"}
        </button>
        <MagneticButton className="hidden md:inline-flex" href="#contact">
          Let&apos;s Talk
        </MagneticButton>
      </div>
    </motion.header>
  );
}
