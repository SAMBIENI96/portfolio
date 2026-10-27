"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, motion, MOTION_OK } from "@/lib/gsap";
import { useContent } from "@/content/ContentProvider";
import Magnetic from "./Magnetic";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { profile, ui } = useContent();
  const t = ui.contact;
  const { email, links } = profile;
  const socials = [
    { label: "WhatsApp", href: links.whatsapp },
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
    { label: ui.hero.cv, href: links.cv },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Les lettres du titre montent l'une après l'autre, le point tombe en dernier.
        const split = SplitText.create(".contact-word", { type: "chars", mask: "chars" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".contact-title", start: "top 80%", once: true } });
        tl.from(split.chars, { yPercent: 110, duration: motion.slow, ease: motion.out, stagger: 0.05 })
          .from(".contact-dot", { yPercent: -400, opacity: 0, duration: 0.9, ease: "bounce.out" }, "-=0.6");
        return () => split.revert();
      });
    },
    { scope: root }
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible : le lien mailto reste utilisable.
    }
  };

  return (
    <footer ref={root} id="contact" className="overflow-hidden bg-ink px-4 pb-10 pt-28 text-paper sm:px-8 lg:px-12 lg:pt-40">
      <p className="mb-6 font-mono text-sm text-paper-muted">
        <span className="text-turquoise">{"//"}</span> {t.label}
      </p>
      <h2 className="contact-title text-[length:var(--text-display)] font-extrabold leading-[0.9] tracking-[-0.045em]">
        <span className="contact-word">{t.title}</span>
        <span className="contact-dot inline-block text-turquoise">.</span>
      </h2>

      <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-line-dark pt-10">
        <div className="col-span-12 md:col-span-7">
          <p className="max-w-[40ch] text-lg leading-relaxed text-paper-muted">
            {profile.availability}. {t.text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${email}`}
                className="inline-block break-all text-xl font-semibold underline decoration-turquoise decoration-2 underline-offset-8 transition-colors hover:text-turquoise sm:text-3xl"
              >
                {email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="border border-line-dark px-4 py-2 font-mono text-[0.75rem] transition-colors hover:border-turquoise hover:text-turquoise"
            >
              {copied ? t.copied : t.copy}
            </button>
            <span role="status" className="sr-only">
              {copied ? t.copiedSr : ""}
            </span>
          </div>
        </div>
        <ul className="col-span-12 flex flex-col gap-3 font-mono text-sm md:col-span-4 md:col-start-9">
          {socials.map((s) => (
            <li key={s.label} className="flex justify-between border-b border-line-dark pb-3">
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-turquoise">
                  {s.label} ↗
                </a>
              ) : (
                <span className="text-paper-muted">{s.label} — {t.toAdd}</span>
              )}
            </li>
          ))}
          <li className="pt-2 text-paper-muted">{profile.location}</li>
        </ul>
      </div>

      <div className="mt-24 flex flex-wrap items-center justify-between gap-6 font-mono text-[0.75rem] text-paper-muted">
        <Image src="/brand/logo-horizontal-inverse.svg" alt="Ebenezer SAMBIENI" width={160} height={39} className="h-8 w-auto" />
        <p>{t.footer}</p>
      </div>
    </footer>
  );
}
