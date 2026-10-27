"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, motion, MOTION_OK } from "@/lib/gsap";
import { useContent } from "@/content/ContentProvider";
import RevealHeading from "./RevealHeading";


export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const { skills, ui } = useContent();
  const t = ui.skills;
  const allTools = skills.flatMap((s) => s.items);
  const half = Math.ceil(allTools.length / 2);
  const rows = [allTools.slice(0, half), allTools.slice(half)];

  // Bandeaux : défilement continu, accéléré et incliné par la vitesse de scroll,
  // inversé quand on remonte la page.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tracks = gsap.utils.toArray<HTMLElement>(".marquee-track");
        const loops = tracks.map((track, i) =>
          gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 })
        );
        const clampBoost = gsap.utils.clamp(1, 6);
        const clampSkew = gsap.utils.clamp(-9, 9);

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            const dir = self.direction;
            const boost = clampBoost(1 + Math.abs(v) / 450);
            loops.forEach((loop) =>
              gsap.to(loop, {
                timeScale: dir * boost,
                duration: 0.2,
                overwrite: true,
                onComplete: () => void gsap.to(loop, { timeScale: dir, duration: 1.2, overwrite: true }),
              })
            );
            gsap.to(".marquee-row", {
              skewX: clampSkew(-v / 280),
              duration: 0.3,
              overwrite: true,
              onComplete: () => void gsap.to(".marquee-row", { skewX: 0, duration: 0.7, ease: "power3.out" }),
            });
          },
        });
      });
    },
    { scope: root }
  );

  // Ouverture d'un domaine : les outils arrivent un par un.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`[data-panel='${open}'] .skill-chip`, {
          y: 18,
          opacity: 0,
          duration: motion.base,
          ease: motion.out,
          stagger: 0.05,
          delay: 0.1,
        });
        gsap.from(`[data-panel='${open}'] .skill-detail`, { opacity: 0, x: 20, duration: motion.base, ease: motion.out, delay: 0.2 });
      });
    },
    { scope: root, dependencies: [open] }
  );

  return (
    <section ref={root} id="competences" aria-labelledby="competences-title" className="overflow-hidden bg-ink py-28 text-paper lg:py-40">
      <div className="px-4 sm:px-8 lg:px-12">
        <p className="mb-4 font-mono text-sm text-paper-muted">
          <span className="text-turquoise">{"//"}</span> {t.label}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RevealHeading id="competences-title" className="max-w-[12ch] text-[length:var(--text-title)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            {t.title}
          </RevealHeading>
          <p className="max-w-[34ch] text-paper-muted">
            {t.note}
          </p>
        </div>
      </div>

      {/* Bandeaux décoratifs : l'information est dans la matrice ci-dessous */}
      <div aria-hidden className="my-20 flex flex-col gap-2 lg:my-28">
        {rows.map((row, r) => (
          <div key={r} className="marquee-row overflow-hidden whitespace-nowrap">
            <div className="marquee-track inline-flex">
              {[0, 1].map((copy) => (
                <span key={copy} className="inline-flex items-center">
                  {row.map((tool) => (
                    <span key={tool} className="inline-flex items-center">
                      <span
                        className={`px-[0.35em] text-[clamp(2.75rem,8vw,7.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] ${
                          r === 0 ? "text-transparent [-webkit-text-stroke:1.5px_var(--paper)]" : "text-turquoise"
                        }`}
                      >
                        {tool}
                      </span>
                      <span className={`inline-block h-[0.55rem] w-10 sm:h-3 sm:w-16 ${r === 0 ? "bg-turquoise" : "bg-paper"}`} />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Matrice : un domaine ouvert à la fois */}
      <div className="px-4 sm:px-8 lg:px-12">
        {skills.map((group, i) => {
          const isOpen = open === i;
          return (
            <div key={group.domain} className="border-t border-line-dark last:border-b">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`skill-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_auto] lg:py-8"
                >
                  <span className="font-mono text-sm text-turquoise">{`${i + 1}`.padStart(2, "0")}</span>
                  <span
                    className={`text-[clamp(1.75rem,4.5vw,4rem)] font-extrabold leading-none tracking-[-0.035em] transition-[color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-turquoise ${
                      isOpen ? "text-turquoise" : ""
                    }`}
                  >
                    {group.domain}
                  </span>
                  <span className="flex items-center gap-4 font-mono text-[0.75rem] text-paper-muted">
                    <span className="hidden sm:inline">{group.items.length} {t.tools}</span>
                    <span
                      aria-hidden
                      className={`relative block size-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-45" : ""}`}
                    >
                      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-paper" />
                      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-paper" />
                    </span>
                  </span>
                </button>
              </h3>

              <div
                id={`skill-panel-${i}`}
                data-panel={i}
                role="region"
                aria-label={group.domain}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-12 gap-y-8 pb-10 sm:pl-[5rem] lg:gap-x-10">
                    <ul className="col-span-12 flex flex-wrap content-start items-start gap-2 lg:col-span-7">
                      {group.items.map((item) => (
                        <li key={item} className="skill-chip border border-line-dark px-4 py-2 font-mono text-sm transition-colors hover:border-turquoise hover:text-turquoise">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="skill-detail col-span-12 lg:col-span-5">
                      <p className="text-lg leading-relaxed">{group.does}</p>
                      <p className="mt-4 font-mono text-[0.8rem] text-paper-muted">
                        <span className="text-turquoise">{t.seenAt}</span> {group.proof.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
