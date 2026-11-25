/** Mascote do Quem Sou Eu?: carinha olhando para cima, com um celular grudado na testa. */
export function ForeheadMascot({ size = 160, mood = 'normal', className = '' }) {
  return (
    <svg className={`mascot mascot-${mood} forehead ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="188" rx="50" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <circle cx="100" cy="112" r="66" fill="#facc15" />
        <path d="M52 86c10-20 30-30 52-30" stroke="#fef08a" strokeWidth="8" strokeLinecap="round" fill="none" opacity=".7" />
        <g className="mascot-eyes">
          <ellipse cx="80" cy="118" rx="10" ry="12" fill="#fff" />
          <ellipse cx="120" cy="118" rx="10" ry="12" fill="#fff" />
          <g className="forehead-pupils">
            <circle cx="80" cy="111" r="5" fill="#1a1033" />
            <circle cx="120" cy="111" r="5" fill="#1a1033" />
          </g>
        </g>
        {mood === 'win' ? (
          <path d="M80 146c12 12 28 12 40 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        ) : mood === 'caught' ? (
          <path d="M84 152q16-10 32 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        ) : (
          <ellipse cx="100" cy="150" rx="8" ry="6" fill="#1a1033" />
        )}
        <circle cx="66" cy="138" r="7" fill="#fb923c" opacity=".5" />
        <circle cx="134" cy="138" r="7" fill="#fb923c" opacity=".5" />
        {/* celular na testa */}
        <g className="forehead-phone">
          <rect x="62" y="22" width="76" height="54" rx="10" fill="#1a1033" />
          <rect x="68" y="28" width="64" height="42" rx="6" fill="#fff" />
          <text x="100" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill="#16a34a" fontFamily="inherit">?</text>
        </g>
      </g>
    </svg>
  )
}
