"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

// Attire légèrement l'élément vers le pointeur (souris uniquement), puis le relâche avec un rebond.
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      const el = ref.current!;
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * strength);
        y((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
