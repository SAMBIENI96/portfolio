"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion, MOTION_OK } from "@/lib/gsap";
import { projects } from "@/content/site";
import RevealHeading from "./RevealHeading";

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Les séparateurs se tracent comme les barres du logo, une ligne après l'autre.
        gsap.from(".project-rule", {
          scaleX: 0,
          transformOrigin: "0 50%",
          duration: motion.slow,
          ease: motion.out,
          stagger: 0.15,
          scrollTrigger: { trigger: ".project-list", start: "top 75%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="projets" aria-labelledby="projets-title" className="bg-paper px-4 pb-28 sm:px-8 lg:px-12 lg:pb-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-4 font-mono text-sm text-ink-muted">
            <span className="text-turquoise-deep">{"//"}</span> projets
          </p>
          <RevealHeading id="projets-title" className="text-[length:var(--text-title)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            Projets choisis
          </RevealHeading>
        </div>
        <p className="max-w-[34ch] text-ink-muted">
          Trois projets, choisis parce qu&apos;ils montrent des choses différentes.
        </p>
      </div>

      <ol className="project-list">
        {projects.map((project, i) => (
          <li key={project.slug} id={`projet-${project.slug}`} className="group relative">
            <div className="project-rule h-px bg-ink" />
            {/* Barre turquoise : rappel des barres du logo, elle marque la ligne survolée */}
            <span aria-hidden className="absolute left-0 top-px h-[calc(100%-1px)] w-1.5 origin-top scale-y-0 bg-turquoise transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-within:scale-y-100" />
            <article className="grid grid-cols-12 gap-x-4 gap-y-5 py-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 lg:py-12">
              <span className="col-span-2 font-mono text-sm text-turquoise-deep lg:col-span-1">0{i + 1}</span>
              <div className="col-span-10 lg:col-span-5">
                <h3 className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">{project.name}</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-muted">{project.need}</p>
              </div>
              <dl className="col-span-10 col-start-3 grid content-start gap-4 font-mono text-[0.8rem] lg:col-span-4 lg:col-start-7">
                <div>
                  <dt className="text-ink-muted">stack</dt>
                  <dd className="mt-1">{project.stack.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">ce que ça prouve</dt>
                  <dd className="mt-1 font-sans text-sm">{project.proves}</dd>
                </div>
              </dl>
              <div className="col-span-10 col-start-3 flex flex-col items-start gap-3 lg:col-span-2 lg:col-start-11 lg:items-end">
                <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[0.75rem]">
                  <span aria-hidden className="size-2 rounded-full bg-turquoise" />
                  {project.status}
                </span>
                {project.toConfirm && <span className="font-mono text-[0.75rem] text-ink-muted">à confirmer</span>}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-turquoise decoration-2 underline-offset-4 hover:text-turquoise-deep">
                    Démo en ligne ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-turquoise decoration-2 underline-offset-4 hover:text-turquoise-deep">
                    Code source ↗
                  </a>
                )}
                <span className="font-mono text-[0.75rem] text-ink-muted">Étude de cas bientôt</span>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <div className="project-rule h-px bg-ink" />
    </section>
  );
}
