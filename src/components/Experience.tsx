"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { education, experiences, profile } from "@/content/site";
import RevealHeading from "./RevealHeading";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // La ligne de temps se remplit au rythme de la lecture.
        gsap.from(".xp-progress", {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: ".xp-list", start: "top 65%", end: "bottom 65%", scrub: true },
        });

        // Chaque expérience : la date se décode, le point s'allume, le contenu glisse en place.
        gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
          const period = item.querySelector<HTMLElement>(".xp-period")!;
          const text = period.textContent ?? "";
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 70%", once: true } });
          tl.to(period, { scrambleText: { text, chars: "0123456789—.", speed: 0.5 }, duration: 0.9, ease: "none" })
            .from(item.querySelector(".xp-dot"), { scale: 0, duration: 0.5, ease: "back.out(3)" }, 0)
            .from(item.querySelectorAll(".xp-reveal"), { y: 28, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.1);
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="parcours" aria-labelledby="parcours-title" className="bg-paper px-4 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="grid grid-cols-12 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 font-mono text-sm text-ink-muted">
              <span className="text-turquoise-deep">{"//"}</span> parcours
            </p>
            <RevealHeading id="parcours-title" className="max-w-[10ch] text-[length:var(--text-title)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              Là où j&apos;ai appris en livrant.
            </RevealHeading>
            <dl className="mt-10 grid gap-5 font-mono text-[0.8rem]">
              <div>
                <dt className="text-ink-muted">base</dt>
                <dd className="mt-1">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">langues</dt>
                <dd className="mt-1">{profile.languages.join(" · ")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="xp-list relative col-span-12 lg:col-span-7 lg:col-start-6">
          <div aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line-light">
            <div className="xp-progress h-full bg-turquoise-deep" />
          </div>

          <ol>
            {experiences.map((xp) => (
              <li key={xp.company} className="xp-item relative pb-16 pl-10">
                <span aria-hidden className="xp-dot absolute left-0 top-1.5 size-[11px] rounded-full bg-turquoise-deep" />
                <p className="xp-period font-mono text-sm text-turquoise-deep">{xp.period}</p>
                <h3 className="xp-reveal mt-3 text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-none tracking-[-0.035em]">{xp.company}</h3>
                <p className="xp-reveal mt-3 text-lg font-semibold">{xp.role}</p>
                <p className="xp-reveal mt-1 font-mono text-[0.8rem] text-ink-muted">{xp.place}</p>
                <ul className="xp-reveal mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                  {xp.tasks.map((task) => (
                    <li key={task} className="relative pl-5 leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.7em] before:h-0.5 before:w-2.5 before:bg-turquoise">
                      {task}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {education.map((ed) => (
              <li key={ed.title} className="xp-item relative pl-10">
                <span aria-hidden className="xp-dot absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-turquoise-deep bg-paper" />
                <p className="xp-period font-mono text-sm text-turquoise-deep">{ed.period}</p>
                <h3 className="xp-reveal mt-3 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{ed.title}</h3>
                <p className="xp-reveal mt-2 text-ink-muted">{ed.school}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
