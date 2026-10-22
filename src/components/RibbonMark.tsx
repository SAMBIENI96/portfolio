// Symbole « Ruban » de la charte, découpé en éléments animables.
// Géométrie identique à svg/symbole-couleur.svg : au repos, c'est exactement le logo.

type Props = {
  inverse?: boolean;
  className?: string;
  title?: string;
};

export default function RibbonMark({ inverse = false, className, title = "Symbole Ebenezer SAMBIENI" }: Props) {
  const bar = inverse ? "#FFFFFF" : "#0B0B0C";
  return (
    <svg viewBox="8 42 240 172" className={className} style={{ overflow: "visible" }} role="img" aria-label={title}>
      <g data-bar="0">
        <rect x="64" y="50" width="128" height="36" fill={bar} data-bar-fill />
        <rect x="64" y="50" width="2" height="36" fill="#1EC8D2" data-seam />
      </g>
      <g data-bar="1">
        <rect x="64" y="110" width="128" height="36" fill={bar} data-bar-fill />
        <rect x="64" y="110" width="2" height="36" fill="#1EC8D2" data-seam />
        <rect x="190" y="110" width="2" height="36" fill="#1EC8D2" data-seam />
      </g>
      <g data-bar="2">
        <rect x="64" y="170" width="128" height="36" fill={bar} data-bar-fill />
        <rect x="190" y="170" width="2" height="36" fill="#1EC8D2" data-seam />
      </g>
      <path data-curve="left" d="M64,50 A48,48 0 0 0 64,146 V110 A12,12 0 0 1 64,86 Z" fill="#1EC8D2" />
      <path data-curve="right" d="M192,110 A48,48 0 0 1 192,206 V170 A12,12 0 0 0 192,146 Z" fill="#1EC8D2" />
    </svg>
  );
}
