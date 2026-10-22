"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, motion, MOTION_OK } from "@/lib/gsap";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

// Titre de section : les lignes montent derrière un masque quand le titre entre à l'écran.
export default function RevealHeading({ id, className, children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            duration: motion.slow,
            ease: motion.out,
            stagger: 0.09,
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          }),
      });
      return () => split.revert();
    });
  });

  return (
    <h2 ref={ref} id={id} className={className}>
      {children}
    </h2>
  );
}
