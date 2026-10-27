"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion, MOTION_OK } from "@/lib/gsap";
import { useContent } from "@/content/ContentProvider";
import RibbonMark from "./RibbonMark";
import Magnetic from "./Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { profile, ui } = useContent();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-intro]", { visibility: "visible" });

        // Entrée : le symbole se construit couche par couche, puis le nom se lève.
        const tl = gsap.timeline({ defaults: { ease: motion.out } });
        tl.from("[data-bar-fill]", { scaleX: 0, transformOrigin: "0% 50%", duration: motion.base, stagger: 0.12 })
          .from("[data-seam]", { opacity: 0, duration: 0.2 }, "<0.3")
          .fromTo("[data-curve='left']", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: motion.base }, "-=0.45")
          .fromTo("[data-curve='right']", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: motion.base }, "-=0.55")
          .from(".hero-line > span", { yPercent: 110, duration: motion.slow, stagger: 0.08 }, 0.15)
          .from(".hero-fade", { opacity: 0, y: 16, duration: motion.base, stagger: 0.08 }, 0.7);

        // Au défilement, le nom s'écarte légèrement : le hero cède la place sans disparaître d'un coup.
        gsap.to(".hero-name", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-mark", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-paper px-4 pb-10 pt-28 sm:px-8 lg:px-12">
      <div className="grid flex-1 grid-cols-12 items-end gap-y-10">
        <div className="col-span-12 lg:col-span-8" data-intro>
          <p className="hero-fade mb-6 font-mono text-sm text-ink-muted">
            <span className="text-turquoise-deep">{"//"}</span> {profile.role}
          </p>
          <h1 className="hero-name leading-[0.88]">
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span className="block text-[length:var(--text-display)] font-extrabold tracking-[-0.045em]">
                {profile.firstName}
              </span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block text-[clamp(1.5rem,4.6vw,4.25rem)] font-semibold tracking-[0.32em]">
                {profile.lastName}
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-mark col-span-7 col-start-6 sm:col-span-5 sm:col-start-8 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-center" data-intro>
          <RibbonMark className="w-full" />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 items-end gap-y-8 border-t border-line-light pt-8" data-intro>
        <p className="hero-fade col-span-12 max-w-[46ch] text-base leading-relaxed text-ink-muted md:col-span-6 lg:col-span-5">
          {profile.intro}
        </p>
        <div className="hero-fade col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end lg:col-span-7">
          <Magnetic>
          <a
            href="#projets"
            className="group inline-flex items-center gap-3 bg-ink px-6 py-4 font-semibold text-paper transition-colors hover:bg-turquoise hover:text-ink"
          >
            {ui.hero.seeProjects}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          </Magnetic>
          <Magnetic>
          <a href="#contact" className="font-semibold underline decoration-turquoise decoration-2 underline-offset-8 hover:text-turquoise-deep">
            {ui.hero.contact}
          </a>
          </Magnetic>
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-ink-muted transition-colors hover:text-turquoise-deep"
          >
            {ui.hero.cv} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
