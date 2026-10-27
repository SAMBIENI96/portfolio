"use client";

import { useRef } from "react";
import { gsap, SplitText, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useContent } from "@/content/ContentProvider";
import RevealHeading from "./RevealHeading";

// La méthode racontée comme un historique Git : un rail de commits se trace,
// un compteur roule, et chaque étape arrive avec son message de commit.
export default function Method() {
  const root = useRef<HTMLElement>(null);
  const { method, ui } = useContent();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Grand écran : la section est épinglée et les étapes se succèdent sur place.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const section = root.current!;
        section.classList.add("is-stacked");

        const steps = gsap.utils.toArray<HTMLElement>(".method-step", section);
        const n = steps.length;
        const splits = steps.map((s) =>
          SplitText.create(s.querySelector(".method-title"), { type: "chars", mask: "chars" })
        );
        const commits = steps.map((s) => s.querySelector<HTMLElement>(".method-commit")!);
        const original = commits.map((c) => c.textContent ?? "");
        commits.slice(1).forEach((c) => (c.textContent = ""));
        gsap.set(steps.slice(1), { autoAlpha: 0 });
        gsap.set(".method-dot", { backgroundColor: "#F4F6F6" });
        gsap.set(".method-dot[data-i='0']", { backgroundColor: "#0B7F88", borderColor: "#0B7F88" });
        gsap.set(".method-node-label[data-i='0']", { color: "#0B0B0C" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${(n - 1) * 75}%`,
            scrub: 0.8,
            pin: true,
            snap: { snapTo: 1 / (n - 1), inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power2.inOut" },
          },
        });

        tl.to(".method-progress", { scaleY: 1, ease: "none", duration: n - 1 }, 0);

        steps.forEach((step, i) => {
          if (i === 0) return;
          const at = i - 0.55;
          const prev = steps[i - 1];
          tl.to(splits[i - 1].chars, { yPercent: -110, stagger: 0.015, duration: 0.3 }, at)
            .to(prev.querySelector(".method-body"), { autoAlpha: 0, y: -24, duration: 0.3 }, at)
            .set(prev, { autoAlpha: 0 }, at + 0.32)
            .set(step, { autoAlpha: 1 }, at + 0.3)
            .from(splits[i].chars, { yPercent: 110, stagger: 0.015, duration: 0.35 }, at + 0.3)
            .from(step.querySelector(".method-body"), { autoAlpha: 0, y: 24, duration: 0.3 }, at + 0.4)
            .to(commits[i], { scrambleText: { text: original[i], chars: "01<>/{}#$_", speed: 0.8 }, duration: 0.35, ease: "none" }, at + 0.45)
            .to(".method-digits", { yPercent: (-100 * i) / n, duration: 0.5 }, at + 0.2)
            .to(`.method-dot[data-i='${i}']`, { backgroundColor: "#0B7F88", borderColor: "#0B7F88", scale: 1.35, duration: 0.2 }, at + 0.45)
            .to(`.method-dot[data-i='${i}']`, { scale: 1, duration: 0.2 }, at + 0.65)
            .to(`.method-node-label[data-i='${i}']`, { color: "#0B0B0C", duration: 0.2 }, at + 0.45)
            .to(`.method-node-label[data-i='${i - 1}']`, { color: "#55595c", duration: 0.2 }, at + 0.45);
        });

        return () => {
          section.classList.remove("is-stacked");
          splits.forEach((s) => s.revert());
          commits.forEach((c, i) => (c.textContent = original[i]));
        };
      });

      // Petit écran : liste verticale, le rail se remplit au défilement et chaque point s'allume au passage.
      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        gsap.from(".method-rail-fill", {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: ".method-list", start: "top 70%", end: "bottom 70%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".method-step").forEach((step) => {
          ScrollTrigger.create({ trigger: step, start: "top 70%", toggleClass: { targets: step, className: "is-reached" } });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="methode" aria-labelledby="methode-title" className="group/method relative overflow-hidden bg-mist">
      <div className="flex flex-col px-4 py-24 sm:px-8 lg:min-h-svh lg:px-12 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono text-sm text-ink-muted">
              <span className="text-turquoise-deep">{"//"}</span> {ui.method.label}
            </p>
            <RevealHeading id="methode-title" className="max-w-[16ch] text-[length:var(--text-title)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              {ui.method.title}
            </RevealHeading>
          </div>
          <p className="font-mono text-[0.8rem] text-ink-muted">
            <span className="text-turquoise-deep">$</span> git log --oneline
          </p>
        </div>

        <div className="relative mt-14 grid flex-1 grid-cols-12 gap-x-6 group-[.is-stacked]/method:mt-10">
          {/* Rail de commits (grand écran animé) */}
          <div aria-hidden className="relative col-span-3 hidden group-[.is-stacked]/method:block">
            <div className="absolute bottom-[0.45rem] left-[5px] top-[0.45rem] w-px bg-line-light">
              <div className="method-progress h-full origin-top scale-y-0 bg-turquoise-deep" />
            </div>
            <ul className="relative flex h-full flex-col justify-between">
              {method.map((step, i) => (
                <li key={step.title} className="flex items-center gap-4 font-mono text-[0.75rem]">
                  <span data-i={i} className="method-dot size-[11px] shrink-0 rounded-full border border-ink" />
                  <span data-i={i} className="method-node-label text-ink-muted">
                    {`${i + 1}`.padStart(2, "0")} {step.title.toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compteur qui roule */}
          <div aria-hidden className="col-span-3 hidden items-start font-mono text-[clamp(7rem,14vw,14rem)] font-medium leading-none tracking-[-0.06em] text-turquoise-deep group-[.is-stacked]/method:flex">
            <span>0</span>
            <span className="block h-[1em] overflow-hidden">
              <span className="method-digits flex flex-col">
                {method.map((_, i) => (
                  <span key={i} className="block h-[1em]">
                    {i + 1}
                  </span>
                ))}
              </span>
            </span>
          </div>

          <div className="relative col-span-12 group-[.is-stacked]/method:col-span-6">
            {/* Rail vertical (petit écran) */}
            <div aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line-light lg:hidden">
              <div className="method-rail-fill h-full bg-turquoise-deep" />
            </div>

            <ol className="method-list relative lg:grid lg:grid-cols-2 lg:gap-x-12 group-[.is-stacked]/method:block group-[.is-stacked]/method:h-full">
              {method.map((step, i) => (
                <li
                  key={step.title}
                  className="method-step group/step relative py-8 pl-9 lg:border-t lg:border-line-light lg:pl-0 group-[.is-stacked]/method:absolute group-[.is-stacked]/method:inset-0 group-[.is-stacked]/method:flex group-[.is-stacked]/method:flex-col group-[.is-stacked]/method:justify-end group-[.is-stacked]/method:border-0 group-[.is-stacked]/method:py-0"
                >
                  <span aria-hidden className="absolute left-0 top-[2.85rem] size-[11px] rounded-full border border-ink bg-mist transition-colors duration-500 group-[.is-reached]/step:border-turquoise-deep group-[.is-reached]/step:bg-turquoise-deep lg:hidden" />
                  <span className="font-mono text-sm text-turquoise-deep group-[.is-stacked]/method:hidden">
                    {`${i + 1}`.padStart(2, "0")}
                  </span>
                  <h3 className="method-title mt-2 text-[clamp(2.25rem,6.2vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                    {step.title}
                  </h3>
                  <div className="method-body mt-5 max-w-[44ch]">
                    <p className="text-lg leading-relaxed text-ink-muted">{step.text}</p>
                    <p className="mt-5 font-mono text-[0.8rem] text-ink">
                      <span className="text-turquoise-deep">$ git commit -m</span> &quot;<span className="method-commit">{step.commit}</span>&quot;
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
