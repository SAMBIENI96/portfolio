// Contenu du portfolio — anglais.
// Traduction de fr.ts : mêmes faits, même structure. Toute modification de fr.ts doit être reportée ici.

import type { Content } from "./types";
import fr from "./fr";

const en: Content = {
  locale: "en",
  meta: {
    title: "Ebenezer Sambieni — Full Stack Developer · React & Laravel",
    description:
      "Portfolio of Ebenezer Sambieni, full stack React and Laravel developer: fast, reliable web applications, from interface to API.",
  },
  ui: {
    homeLabel: "Home — Ebenezer SAMBIENI",
    navLabel: "Main navigation",
    menu: "Menu",
    languageLabel: "Language",
    nav: { projects: "Projects", method: "Process", skills: "Skills", journey: "Experience", contact: "Contact" },
    hero: { seeProjects: "See my work", contact: "Get in touch", cv: "Resume (PDF)" },
    layers: {
      label: "from frontend to backend",
      title: "Three layers, one product.",
      markTitle: "The three layers of the logo",
      items: [
        {
          label: "Interface",
          text: "Clear, responsive and accessible screens, designed for the people who use them.",
          tools: "React.js · Next.js · TypeScript · Tailwind CSS · Bootstrap",
        },
        {
          label: "API & integrations",
          text: "Connecting the application to the services it needs: authentication, data, payments.",
          tools: "Secure REST APIs · Express.js · Webhooks · FedaPay · Supabase",
        },
        {
          label: "Server & data",
          text: "Business logic, roles, permissions and a well-structured database.",
          tools: "Laravel · PHP · Node.js · MySQL · PostgreSQL · MongoDB",
        },
      ],
    },
    statement: { label: "approach", aria: "My approach" },
    projects: {
      label: "projects",
      title: "Selected work",
      note: "Three projects, chosen because each one shows something different.",
      stack: "stack",
      proves: "what it shows",
      toConfirm: "to be confirmed",
      demo: "Live demo",
      code: "Source code",
      caseStudySoon: "Case study coming soon",
    },
    method: { label: "process", title: "From idea to live product." },
    skills: {
      label: "skills",
      title: "What I can do.",
      note: "Each area says what I actually do with it, and where to see it.",
      tools: "tools",
      seenAt: "seen at / in →",
    },
    journey: { label: "experience", title: "Where I learned by shipping.", base: "based in", languages: "languages" },
    contact: {
      label: "contact",
      title: "Let's talk",
      text: "A project, a contract or a role: write to me, I reply personally.",
      copy: "Copy",
      copied: "Copied ✓",
      copiedSr: "Email address copied",
      toAdd: "coming soon",
      footer: "© Ebenezer SAMBIENI · designed and built by me",
    },
  },
  profile: {
    ...fr.profile,
    role: "Full Stack Developer · React & Laravel",
    intro: "I turn your ideas into fast, reliable web applications that are a pleasure to use, from interface to API.",
    statement: "I love turning a business need into a product that is reliable, fast and a pleasure to use.",
    location: "Cotonou, Benin · UTC+1",
    availability: "Available for remote work · freelance or full-time",
    languages: ["French — fluent", "English — fluent"],
  },
  projects: [
    {
      ...fr.projects[0],
      need: "Running a car repair shop: vehicles, repair jobs, and Owner, Front desk and Mechanic roles.",
      stack: ["Laravel", "PHP", "[Database]"],
      status: "Deployed",
      proves: "Business logic, authentication, role-based permissions, database",
    },
    {
      ...fr.projects[1],
      need: "Website for a real business: menu, cart, ordering and online payment.",
      status: "Live",
      proves: "Frontend/backend integration, payments, SEO, deployment",
    },
    {
      ...fr.projects[2],
      need: "Editorial platform with content managed through an admin interface.",
      status: "In progress",
      proves: "Fitting a solution to a business need, back office",
    },
  ],
  method: [
    { title: "Understand", text: "Listen to the need, identify the users and the constraints before writing any code.", commit: "docs: scope the need and the users" },
    { title: "Design", text: "Define the screens, the data model and the simplest architecture that holds up.", commit: "feat: wireframes, data schema, architecture" },
    { title: "Build", text: "Work in verifiable steps, with readable code and reusable components.", commit: "feat: React interface + Laravel API" },
    { title: "Test", text: "Automated tests, user flows, errors, responsive: checked before delivery.", commit: "test: user flows, error cases, responsive" },
    { title: "Deploy", text: "Ship cleanly without exposing secrets, and train the client when needed.", commit: "chore: production release" },
    { title: "Improve", text: "Optimise performance, fix and evolve the product with its users.", commit: "perf: measure, fix, iterate" },
  ],
  skills: [
    {
      domain: "Front-end",
      items: fr.skills[0].items,
      does: "Turning designs into reusable, responsive React components that stay true to the mockups.",
      proof: ["ALTA agency", "Intside", "Croisière à la Maison Blanche"],
    },
    {
      domain: "Back-end",
      items: ["Laravel", "PHP", "Node.js", "Express.js", "Secure REST APIs", "Filament", "Payment webhooks (FedaPay)"],
      does: "Building secure REST APIs and the business logic of client projects.",
      proof: ["ALTA agency", "AutoGest", "Aheme Media"],
    },
    {
      domain: "Databases",
      items: fr.skills[2].items,
      does: "Modelling the data of a business application: users, roles, repair jobs.",
      proof: ["AutoGest", "Croisière à la Maison Blanche"],
    },
    {
      domain: "CMS & Web",
      items: fr.skills[3].items,
      does: "Delivering custom WordPress sites, putting them online, improving SEO and training clients.",
      proof: ["ALTA agency", "Digi Master"],
    },
    {
      domain: "Quality & tools",
      items: ["Automated testing", "Performance optimisation", "Debugging", "Git", "GitHub", "Figma", "Docker"],
      does: "Making deliveries reliable: tests, debugging, version control and faster pages.",
      proof: ["ALTA agency", "Intside"],
    },
  ],
  experiences: [
    {
      company: "ALTA agency",
      role: "Full Stack Developer",
      period: "Nov 2025 — present",
      place: "Bastia, France · remote from Cotonou",
      tasks: [
        "Design and build end-to-end web applications with React and Laravel.",
        "Build secure REST APIs and the back-end logic of client projects.",
        "Create responsive interfaces with Tailwind CSS and Bootstrap, true to the mockups.",
        "Deliver custom WordPress sites (Elementor Pro) and train clients to manage them.",
        "Make deliveries reliable through automated testing, debugging and performance optimisation.",
      ],
    },
    {
      company: "Intside",
      role: "Front-End Developer · internship",
      period: "Nov 2025 — Jan 2026",
      place: "Cotonou, Benin",
      tasks: [
        "Turned designs into reusable React components with Tailwind CSS.",
        "Connected interfaces to APIs together with the back-end team.",
        "Improved the front-end performance of delivered pages.",
      ],
    },
    {
      company: "Digi Master",
      role: "SEO & IT Support Officer",
      period: "Jul — Oct 2024",
      place: "Godomey, Benin",
      tasks: [
        "Improved the SEO of WordPress sites and tracked traffic with Google Analytics.",
        "Built interfaces with React and Tailwind CSS; provided user support.",
      ],
    },
  ],
  education: [
    { title: "Bachelor's degree in Software Engineering", school: "ESGIS, Benin", period: "2026 — in progress" },
    { title: "Technician Diploma", school: "Lycée Technique et Professionnel de Bopa, Benin", period: "2023 — 2026" },
  ],
};

export default en;
