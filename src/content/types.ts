// Forme commune du contenu : chaque langue (fr.ts, en.ts) fournit exactement ces champs.

export type Project = {
  slug: string;
  name: string;
  need: string;
  stack: string[];
  status: string;
  proves: string;
  demoUrl?: string;
  repoUrl?: string;
  toConfirm?: boolean;
};

export type Content = {
  locale: "fr" | "en";
  meta: { title: string; description: string };
  ui: {
    homeLabel: string;
    navLabel: string;
    menu: string;
    languageLabel: string;
    nav: { projects: string; method: string; skills: string; journey: string; contact: string };
    hero: { seeProjects: string; contact: string; cv: string };
    layers: { label: string; title: string; markTitle: string; items: { label: string; text: string; tools: string }[] };
    statement: { label: string; aria: string };
    projects: { label: string; title: string; note: string; stack: string; proves: string; toConfirm: string; demo: string; code: string; caseStudySoon: string };
    method: { label: string; title: string };
    skills: { label: string; title: string; note: string; tools: string; seenAt: string };
    journey: { label: string; title: string; base: string; languages: string };
    contact: { label: string; title: string; text: string; copy: string; copied: string; copiedSr: string; toAdd: string; footer: string };
  };
  profile: {
    firstName: string;
    lastName: string;
    role: string;
    intro: string;
    statement: string;
    location: string;
    availability: string;
    email: string;
    languages: string[];
    links: { github: string; whatsapp: string; linkedin: string; cv: string };
  };
  projects: Project[];
  method: { title: string; text: string; commit: string }[];
  skills: { domain: string; items: string[]; does: string; proof: string[] }[];
  experiences: { company: string; role: string; period: string; place: string; tasks: string[] }[];
  education: { title: string; school: string; period: string }[];
};
