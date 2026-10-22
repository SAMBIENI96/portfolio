"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Les ancres internes passent par Lenis pour garder le défilement fluide.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href")!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
