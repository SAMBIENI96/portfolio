"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useContent } from "@/content/ContentProvider";
import { locales } from "@/content";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const first = useRef(true);
  const { locale, ui } = useContent();
  const nav = [
    { href: "#projets", label: ui.nav.projects },
    { href: "#methode", label: ui.nav.method },
    { href: "#competences", label: ui.nav.skills },
    { href: "#parcours", label: ui.nav.journey },
    { href: "#contact", label: ui.nav.contact },
  ];

  // Se cache quand on descend, revient quand on remonte ; prend un fond une fois la page défilée.
  useGSAP(() => {
    const el = ref.current!;
    const show = gsap.quickTo(el, "yPercent", { duration: 0.45, ease: "power3.out" });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scrolled = self.scroll() > 80;
        el.classList.toggle("is-scrolled", scrolled);
        show(scrolled && self.direction === 1 && !el.contains(document.activeElement) ? -100 : 0);
      },
    });
  });

  // La pilule « Menu » s'agrandit en panneau, puis les liens arrivent un par un.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const reduced = !window.matchMedia(MOTION_OK).matches;
      const d = reduced ? 0 : 1;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (open) {
        tl.to(box.current, { width: "min(17rem, calc(100vw - 2rem))", height: "auto", borderRadius: 20, duration: 0.6 * d })
          .to(".menu-icon", { rotate: 90, duration: 0.5 * d }, 0)
          .fromTo(".menu-link", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 * d, stagger: 0.05 * d }, 0.12 * d);
      } else {
        tl.to(".menu-link", { opacity: 0, duration: 0.15 * d })
          .to(box.current, { width: "", height: "", borderRadius: 24, duration: 0.5 * d, ease: "power3.inOut", clearProps: "width,height" }, 0.05 * d)
          .to(".menu-icon", { rotate: 0, duration: 0.4 * d }, 0);
      }
    },
    { scope: ref, dependencies: [open] }
  );

  // Fermeture : Échap (le focus revient sur le bouton) ou clic en dehors du menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={ref} className="group/header fixed inset-x-0 top-0 z-50">
      <div className="flex h-[4.75rem] items-center justify-between px-4 transition-[background-color,box-shadow] duration-300 group-[.is-scrolled]/header:bg-paper/85 group-[.is-scrolled]/header:shadow-[0_1px_0_var(--line-light)] group-[.is-scrolled]/header:backdrop-blur-md sm:px-8 lg:px-12">
        <a href="#top" aria-label={ui.homeLabel} className="block">
          {/* Petit écran : le symbole seul laisse la place au sélecteur de langue et au menu */}
          <Image src="/brand/symbole-couleur.svg" alt="" width={56} height={40} priority className="h-9 w-auto sm:hidden" />
          <Image src="/brand/logo-horizontal-couleur.svg" alt="" width={160} height={39} priority className="hidden h-9 w-auto sm:block" />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
        {/* Sélecteur de langue : chaque langue a sa propre adresse (/fr, /en) */}
        <nav aria-label={ui.languageLabel}>
          <ul className="flex items-center rounded-full border border-line-light bg-paper/70 p-1 font-mono text-[0.75rem] backdrop-blur-sm">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={`/${l}`}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "page" : undefined}
                  className={`block rounded-full px-2.5 py-1.5 uppercase transition-colors ${
                    l === locale ? "bg-ink text-paper" : "text-ink-muted hover:text-turquoise-deep"
                  }`}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={ui.navLabel} className="relative h-12 w-[8.5rem]">
          <div ref={box} className="absolute right-0 top-0 h-12 w-[8.5rem] overflow-hidden rounded-[24px] bg-ink text-paper shadow-[0_12px_32px_-12px_rgba(11,11,12,0.5)]">
            <button
              ref={button}
              type="button"
              aria-expanded={open}
              aria-controls="menu-principal"
              onClick={() => setOpen((o) => !o)}
              className="flex h-12 w-full items-center justify-between gap-6 pl-6 pr-5 font-semibold"
            >
              {ui.menu}
              <svg aria-hidden viewBox="0 0 20 20" className="menu-icon size-4 text-turquoise">
                <path d="M7 5 2 10l5 5M13 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <ul id="menu-principal" hidden={!open} className="px-3 pb-4 pt-1">
              {nav.map((item, i) => (
                <li key={item.href} className="menu-link">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-lg font-semibold transition-colors hover:bg-white/5 hover:text-turquoise"
                  >
                    <span className="font-mono text-[0.7rem] text-paper-muted transition-colors group-hover:text-turquoise">
                      {`${i + 1}`.padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        </div>
      </div>
    </header>
  );
}
