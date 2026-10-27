# Portfolio — Ebenezer SAMBIENI

Portfolio de développeur web et mobile. Next.js (App Router) + TypeScript + Tailwind CSS v4, animations GSAP (ScrollTrigger) et défilement fluide Lenis.

## Commandes

```bash
npm install      # installer les dépendances
npm run dev      # développement : http://localhost:3000
npm run lint     # vérification du code
npm run build    # build de production
npm run start    # lancer le build de production
```

## Structure

```
src/
├── app/[lang]/     layout (polices, métadonnées, icônes) et page d'accueil, une par langue
├── proxy.ts        redirige / vers /fr ou /en selon la langue du navigateur
├── components/     sections de la page (Hero, Layers, Projects, Method, Skills, Contact…)
├── content/        contenu du portfolio : fr.ts (français), en.ts (anglais), types.ts
└── lib/gsap.ts     enregistrement GSAP + jetons de mouvement
public/             icônes et logos issus de identite-ebenezer-sambieni-v2
```

## Charte graphique

Couleurs, polices et logos : voir `identite-ebenezer-sambieni-v2/LISEZ-MOI.md`.
Turquoise `#1EC8D2` (accents, fonds sombres), turquoise profond `#0B7F88` (texte sur blanc), noir `#0B0B0C`, blanc, gris clair `#F4F6F6`. Polices : Sora et JetBrains Mono.

## Animations et accessibilité

Toutes les animations passent par `gsap.matchMedia()` avec `prefers-reduced-motion: no-preference`.
Si l'utilisateur demande de réduire les animations, la page s'affiche complète et statique.

## Contenu à compléter

Tout ce qui est entre `[crochets]` ou marqué `toConfirm` dans `src/content/` doit être confirmé avant publication.

## Langues

Le site existe en français (`/fr`) et en anglais (`/en`). Le texte se modifie dans `src/content/fr.ts` et `src/content/en.ts` :
toute modification d'un fichier doit être reportée dans l'autre. TypeScript signale un champ manquant au build.
