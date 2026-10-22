// Contenu du portfolio.
// Source : CV (A4) et cahier des charges. Uniquement des faits vérifiables.
// Tout ce qui est marqué `toConfirm: true` ou entre [crochets] doit être confirmé avant publication.
// Plus tard, ce contenu sera géré depuis l'admin (base de données).

export type ProjectStatus = "En production" | "Déployé" | "En cours" | "Prototype";

export type Project = {
  slug: string;
  name: string;
  need: string;
  stack: string[];
  status: ProjectStatus;
  proves: string;
  demoUrl?: string;
  repoUrl?: string;
  toConfirm?: boolean;
};

export const profile = {
  firstName: "Ebenezer",
  lastName: "SAMBIENI",
  role: "Développeur Full Stack · React & Laravel",
  intro:
    "Je transforme vos idées en applications web rapides, fiables et agréables à utiliser, de l'interface à l'API.",
  statement:
    "J'aime transformer un besoin métier en produit fiable, rapide et agréable à utiliser.",
  location: "Cotonou, Bénin · UTC+1",
  availability: "Disponible en télétravail · freelance ou temps plein",
  email: "sambieniebenezer1@gmail.com",
  languages: ["Français — courant", "Anglais — courant"],
  links: {
    github: "https://github.com/SAMBIENI96",
    linkedin: "https://www.linkedin.com/in/ebenezer-sambieni-582264235/",
    cv: "/cv-ebenezer-sambieni.pdf",
  },
};

export const projects: Project[] = [
  {
    slug: "autogest",
    name: "AutoGest",
    need: "Gérer l'activité d'un garage : véhicules, interventions et rôles Patron, Accueil, Mécanicien.",
    stack: ["Laravel", "PHP", "[Base de données]"],
    status: "Déployé",
    proves: "Logique métier, authentification, autorisations par rôle, base de données",
    demoUrl: "https://gestion-garage-kmas.onrender.com",
    toConfirm: true,
  },
  {
    slug: "croisiere-maison-blanche",
    name: "Croisière à la Maison Blanche",
    need: "Site pour une activité réelle : menu, panier, commande et paiement en ligne.",
    stack: ["Next.js", "Supabase", "FedaPay"],
    status: "En production",
    proves: "Intégration frontend/backend, paiement, référencement, déploiement",
    toConfirm: true,
  },
  {
    slug: "aheme-media",
    name: "Aheme Media",
    need: "Plateforme éditoriale avec gestion du contenu par une interface d'administration.",
    stack: ["Laravel", "Filament"],
    status: "En cours",
    proves: "Adapter une solution à un besoin métier, back-office",
    toConfirm: true,
  },
];

// La méthode décrite dans le cahier des charges (§ 3.2).
// `commit` : la même étape, écrite comme un message de commit.
export const method = [
  { title: "Comprendre", text: "Écouter le besoin, identifier les utilisateurs et les contraintes avant d'écrire du code.", commit: "docs: cadrer le besoin et les utilisateurs" },
  { title: "Concevoir", text: "Définir les écrans, le modèle de données et l'architecture la plus simple qui tienne.", commit: "feat: maquettes, schéma de données, architecture" },
  { title: "Développer", text: "Construire par étapes vérifiables, avec un code lisible et des composants réutilisables.", commit: "feat: interface React + API Laravel" },
  { title: "Tester", text: "Tests automatisés, parcours, erreurs, responsive : on vérifie avant de livrer.", commit: "test: parcours, cas d'erreur, responsive" },
  { title: "Déployer", text: "Mettre en ligne proprement, sans exposer de secrets, et former le client si besoin.", commit: "chore: mise en production" },
  { title: "Améliorer", text: "Optimiser les performances, corriger et faire évoluer le produit avec ses utilisateurs.", commit: "perf: mesurer, corriger, itérer" },
];

// Compétences du CV, regroupées par domaine.
// `does` : ce que je fais concrètement avec (tiré des expériences du CV).
// `proof` : où le voir — projets du portfolio ou expériences.
export const skills = [
  {
    domain: "Front-end",
    items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    does: "Intégrer des maquettes en composants React réutilisables, responsives et fidèles au design.",
    proof: ["Agence ALTA", "Intside", "Croisière à la Maison Blanche"],
  },
  {
    domain: "Back-end",
    items: ["Laravel (PHP)", "Node.js", "API REST sécurisées"],
    does: "Construire des API REST sécurisées et la logique métier de projets clients.",
    proof: ["Agence ALTA", "AutoGest", "Aheme Media"],
  },
  {
    domain: "Bases de données",
    items: ["MySQL", "MongoDB"],
    does: "Modéliser les données d'une application métier : utilisateurs, rôles, interventions.",
    proof: ["AutoGest"],
  },
  {
    domain: "CMS & Web",
    items: ["WordPress", "Elementor Pro", "SEO", "Google Analytics"],
    does: "Livrer des sites WordPress sur mesure, optimiser le référencement et former les clients.",
    proof: ["Agence ALTA", "Digi Master"],
  },
  {
    domain: "Qualité",
    items: ["Tests automatisés", "Optimisation des performances", "Débogage"],
    does: "Fiabiliser les livraisons : tests, débogage et pages plus rapides.",
    proof: ["Agence ALTA", "Intside"],
  },
];

export const experiences = [
  {
    company: "Agence ALTA",
    role: "Développeur Full Stack",
    period: "Nov. 2025 — aujourd'hui",
    place: "Bastia, France · en télétravail depuis Cotonou",
    tasks: [
      "Conçois et développe des applications web de bout en bout avec React et Laravel.",
      "Construis des API REST sécurisées et la logique back-end des projets clients.",
      "Réalise des interfaces responsives avec Tailwind CSS et Bootstrap, fidèles aux maquettes.",
      "Livre des sites WordPress sur mesure (Elementor Pro) et forme les clients à leur gestion.",
      "Fiabilise les livraisons grâce aux tests automatisés, au débogage et à l'optimisation des performances.",
    ],
  },
  {
    company: "Intside",
    role: "Développeur Front-End · stage",
    period: "Nov. 2025 — janv. 2026",
    place: "Cotonou, Bénin",
    tasks: [
      "Intégré des maquettes en composants React réutilisables avec Tailwind CSS.",
      "Connecté les interfaces aux API en collaboration avec l'équipe back-end.",
      "Amélioré les performances front-end des pages livrées.",
    ],
  },
  {
    company: "Digi Master",
    role: "Chargé SEO & Support informatique",
    period: "Juil. — oct. 2024",
    place: "Godomey, Bénin",
    tasks: [
      "Optimisé le référencement de sites WordPress et suivi le trafic avec Google Analytics.",
      "Développé des interfaces en React et Tailwind CSS ; assuré le support utilisateurs.",
    ],
  },
];

export const education = [
  {
    title: "Licence en Génie logiciel",
    school: "ESGIS, Bénin",
    period: "2026 — en cours",
  },
  {
    title: "Diplôme de Technicien",
    school: "Lycée Technique et Professionnel de Bopa, Bénin",
    period: "2023 — 2026",
  },
];
