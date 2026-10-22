"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { profile } from "@/content/site";

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const words = profile.statement.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Les mots s'allument dans l'ordre de lecture, au rythme du défilement.
        gsap.from(".statement-word", {
          opacity: 0.16,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".statement-text", start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="Ma démarche" className="bg-paper px-4 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="grid grid-cols-12">
        <p className="col-span-12 mb-8 font-mono text-sm text-ink-muted lg:col-span-3">
          <span className="text-turquoise-deep">{"//"}</span> démarche
        </p>
        <p className="statement-text col-span-12 text-[length:var(--text-lead)] font-semibold leading-[1.2] tracking-[-0.02em] lg:col-span-9">
          {words.map((word, i) => (
            <span key={i} className="statement-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
