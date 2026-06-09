"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });

    const move = (event: PointerEvent) => {
      xTo(event.clientX - 160);
      yTo(event.clientY - 160);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
