/** Mascote do Na Mosca: um alvo com uma mosquinha voando em volta e pousando no centro. */
export function TargetMascot({ size = 160, className = '' }) {
  return (
    <svg className={`mascot target ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="188" rx="50" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <circle cx="100" cy="100" r="76" fill="#fff" />
        <circle cx="100" cy="100" r="64" fill="#f43f5e" />
        <circle cx="100" cy="100" r="50" fill="#fff" />
        <circle cx="100" cy="100" r="36" fill="#f43f5e" />
        <circle cx="100" cy="100" r="22" fill="#fff" />
        <circle cx="100" cy="100" r="10" fill="#f43f5e" />
        <circle cx="84" cy="128" r="4" fill="#1a1033" />
        <circle cx="116" cy="128" r="4" fill="#1a1033" />
        <path d="M90 140q10 8 20 0" stroke="#1a1033" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
      <g className="fly">
        <ellipse cx="0" cy="0" rx="7" ry="5" fill="#1a1033" />
        <ellipse className="fly-wing" cx="-3" cy="-6" rx="5" ry="7" fill="#bae6fd" opacity=".85" />
        <ellipse className="fly-wing" cx="4" cy="-6" rx="5" ry="7" fill="#bae6fd" opacity=".85" />
        <circle cx="6" cy="-1" r="1.6" fill="#f43f5e" />
      </g>
    </svg>
  )
}
