/** Mascote da Bomba Secreta: bombinha redonda com pavio faiscando. */
export function BombMascot({ size = 160, mood = 'normal', className = '' }) {
  const boom = mood === 'boom'
  return (
    <svg className={`mascot mascot-${boom ? 'caught' : mood} bomb-mascot ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="188" rx="50" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <rect x="86" y="44" width="28" height="22" rx="5" fill="#475569" />
        <path className="bomb-fuse" d="M100 46c0-16 10-24 24-26" stroke="#a16207" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="120" r="62" fill={boom ? '#1e1b2e' : '#27223f'} />
        <path d="M60 96c8-18 24-28 40-30" stroke="#6b6394" strokeWidth="8" strokeLinecap="round" fill="none" />
        {boom ? (
          <>
            <path d="M70 108l16 12M86 108l-16 12M114 108l16 12M130 108l-16 12" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="100" cy="146" rx="10" ry="8" fill="#fff" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="114" rx="9" ry="11" fill="#fff" />
            <ellipse cx="120" cy="114" rx="9" ry="11" fill="#fff" />
            <circle cx="82" cy="116" r="4.5" fill="#1a1033" />
            <circle cx="122" cy="116" r="4.5" fill="#1a1033" />
            <path d="M84 142q16 10 32 0" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}
      </g>
      <g className="bomb-spark">
        <circle cx="126" cy="20" r="9" fill="#fde047" />
        <path d="M126 4v8M126 28v8M110 20h8M134 20h8M115 9l5 5M137 31l-5-5M137 9l-5 5M115 31l5-5" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}
