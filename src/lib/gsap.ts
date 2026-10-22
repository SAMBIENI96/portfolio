"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

// Tokens de mouvement : trois niveaux plutôt qu'une seule durée partout.
export const motion = {
  fast: 0.35,
  base: 0.8,
  slow: 1.4,
  out: "expo.out",
  inOut: "power3.inOut",
};

// Toutes les animations passent par cette requête : rien ne bouge si l'utilisateur
// a demandé de réduire les animations, et la page reste complète sans elles.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
