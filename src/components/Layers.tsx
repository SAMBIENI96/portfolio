"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import RibbonMark from "./RibbonMark";
import RevealHeading from "./RevealHeading";

// Les trois barres du logo représentent les couches front / API / back (charte, LISEZ-MOI).
const layers = [
  {
    label: "Interface",
    text: "Des écrans clairs, responsive et accessibles, pensés pour la personne qui les utilise.",
    tools: "React.js · JavaScript · Tailwind CSS · Bootstrap",
  },
  {
    label: "API & intégrations",
    text: "Relier l'application aux services dont elle a besoin : authentification, données, paiement.",
    tools: "API REST sécurisées · FedaPay · Supabase",
  },
  {
    label: "Serveur & données",
    text: "La logique métier, les rôles, les autorisations et une base de données bien structurée.",
    tools: "Laravel · Node.js · MySQL · MongoDB",
  },
];

export default function Layers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        // Avant la timeline : ScrollTrigger lit les valeurs de départ dès sa création.
        gsap.set(".layer-item", { opacity: 0.18 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            scrub: 0.6,
            pin: true,
          },
        });

        // 1. Le ruban se défait : les virages s'effacent, les barres s'écartent.
        tl.to("[data-curve]", { opacity: 0, duration: 0.6 })
          .to("[data-seam]", { opacity: 0, duration: 0.3 }, "<")
          .to("[data-bar='0']", { y: -34, duration: 1 }, 0)
          .to("[data-bar='2']", { y: 34, duration: 1 }, 0);

        // 2. Chaque couche s'allume à son tour, avec son texte.
        layers.forEach((_, i) => {
          const at = 1.1 + i * 1.1;
          tl.to(`[data-bar='${i}'] [data-bar-fill]`, { fill: "#1EC8D2", duration: 0.4 }, at)
            .to(`.layer-item:nth-child(${i + 1})`, { opacity: 1, duration: 0.4 }, at)
            .from(`.layer-item:nth-child(${i + 1}) .layer-rule`, { scaleX: 0, transformOrigin: "0 50%", duration: 0.6 }, at);
          if (i < layers.length - 1) {
            tl.to(`[data-bar='${i}'] [data-bar-fill]`, { fill: "#FFFFFF", duration: 0.4 }, at + 1);
          }
        });

        // 3. Les couches se referment en ruban : le produit, c'est l'ensemble.
        tl.to(`[data-bar-fill]`, { fill: "#FFFFFF", duration: 0.4 }, 4.6)
          .to("[data-bar='0'], [data-bar='2']", { y: 0, duration: 0.8 }, 4.6)
          .to("[data-curve], [data-seam]", { opacity: 1, duration: 0.5 }, 5.1);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="layers-title" className="relative bg-ink text-paper">
      <div className="grid min-h-svh grid-cols-12 items-center gap-y-12 px-4 py-24 sm:px-8 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="mb-6 font-mono text-sm text-paper-muted">
            <span className="text-turquoise">{"//"}</span> du frontend au backend
          </p>
          <RevealHeading id="layers-title" className="max-w-[12ch] text-[length:var(--text-title)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            Trois couches, un seul produit.
          </RevealHeading>
          <RibbonMark inverse className="mt-12 w-40 sm:w-56 lg:w-72" title="Les trois couches du symbole" />
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
          {layers.map((layer, i) => (
            <li key={layer.label} className="layer-item py-8 first:pt-0">
              <div className="layer-rule mb-6 h-px bg-line-dark" />
              <div className="grid grid-cols-[3rem_1fr] gap-x-4">
                <span className="font-mono text-sm text-turquoise">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{layer.label}</h3>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-paper-muted">{layer.text}</p>
                  <p className="mt-4 font-mono text-[0.8rem] text-paper">{layer.tools}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
