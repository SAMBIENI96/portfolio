# Identité visuelle — Ebenezer SAMBIENI (v2 · turquoise & noir)

## Le logo « Ruban »
Trois barres noires (le E d'Ebenezer, et les couches front / API / back) reliées par deux virages turquoise qui dessinent le S de Sambieni.
Tous les SVG sont vectorisés (aucun texte live, aucun trait) : ils s'agrandissent sans perte.

| Dossier | Contenu |
|---|---|
| svg/ | symbole, logo horizontal, logo empilé, nom seul — versions couleur, inverse (fond noir), noir, blanc, turquoise ; app-icon |
| png/ | les mêmes en PNG transparents (512/1024 px pour le symbole, 2000 px de large pour les logos) |
| web/ | favicon.ico, favicon.svg, PNG 16/32/48, apple-touch-icon, icon-192/512, maskable-512, site.webmanifest, head-snippet.html |

## Couleurs
| Nom | HEX | RVB | CMJN (indicatif) | Rôle |
|---|---|---|---|---|
| Turquoise | #1EC8D2 | 30 200 210 | ≈ 72 0 18 0 | virages du logo, accents, boutons sur fond noir |
| Noir | #0B0B0C | 11 11 12 | 60 40 40 100 (noir riche) | textes, fonds sombres |
| Blanc | #FFFFFF | 255 255 255 | 0 0 0 0 | fond principal |
| Turquoise profond | #0B7F88 | 11 127 136 | 92 7 0 47 | liens et textes turquoise sur fond blanc (lisibilité) |
| Gris clair | #F4F6F6 | 244 246 246 | 2 0 0 4 | fonds secondaires |

Dosage : 50 % blanc, 35 % noir, 15 % turquoise.
Le turquoise vif n'est pas assez contrasté pour du texte sur blanc : utilise le turquoise profond.
CMJN = conversions : demande un BAT à l'imprimeur.

## Typographie (Google Fonts, licence libre OFL)
- Sora : titres (ExtraBold/Bold), textes (Regular 16 px), et le nom SAMBIENI (SemiBold, lettres espacées)
- JetBrains Mono : code, étiquettes, chiffres

## Règles
- Zone de protection : la hauteur d'une barre du symbole tout autour.
- Taille minimale : logo horizontal 130 px / 35 mm ; symbole 16 px / 6 mm.
- À éviter : déformer, changer les couleurs, pivoter, ajouter ombres ou effets, poser la version couleur sur du turquoise (utilise la version noire).

## Pour ton site
Copie le contenu de web/ à la racine du site et colle head-snippet.html dans le <head>.

## À vérifier
Avant un dépôt de marque, fais une recherche d'antériorité (OAPI).
