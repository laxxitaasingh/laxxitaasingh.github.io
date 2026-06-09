"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function MagneticButton({ children, className, variant = "ghost", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
    element.style.setProperty("--magnet-x", `${x}px`);
    element.style.setProperty("--magnet-y", `${y}px`);
  };

  return (
    <motion.a
      ref={ref}
      whileTap={{ scale: 0.97 }}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--magnet-x", "0px");
        ref.current?.style.setProperty("--magnet-y", "0px");
      }}
      className={cn(
        "magnetic-button group relative inline-flex min-h-11 w-full items-center justify-center gap-3 overflow-hidden rounded-full px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:min-h-12 sm:w-auto sm:px-7",
        variant === "primary" ? "button-primary text-black" : "button-ghost text-white",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
    </motion.a>
  );
}
