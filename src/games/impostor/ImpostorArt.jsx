/** Mascote do Impostor: figura encapuzada com olhos desconfiados (SVG + CSS). */
export function ImpostorMascot({ size = 160, mood = 'normal', className = '' }) {
  return (
    <svg
      className={`mascot mascot-${mood} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ef4444" />
          <stop offset="1" stopColor="#9f1239" />
        </linearGradient>
        <radialGradient id="face" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#1e1238" />
          <stop offset="1" stopColor="#0b0618" />
        </radialGradient>
      </defs>
      <ellipse className="mascot-shadow" cx="100" cy="186" rx="52" ry="7" fill="rgba(0,0,0,.35)" />
      <g className="mascot-body">
        <path d="M100 18c-42 0-68 34-68 78v62c0 14 10 24 24 24h88c14 0 24-10 24-24V96c0-44-26-78-68-78z" fill="url(#hood)" />
        <path d="M100 18c-10 10-14 22-14 34" stroke="#fda4af" strokeOpacity=".5" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M100 44c-30 0-48 24-48 54 0 26 20 44 48 44s48-18 48-44c0-30-18-54-48-54z" fill="url(#face)" />
        <g className="mascot-eyes">
          <ellipse cx="82" cy="96" rx="11" ry={mood === 'caught' ? 13 : 7} fill="#fff" />
          <ellipse cx="118" cy="96" rx="11" ry={mood === 'caught' ? 13 : 7} fill="#fff" />
          <g className="mascot-pupils">
            <circle cx="85" cy="97" r="4.5" fill="#0b0618" />
            <circle cx="121" cy="97" r="4.5" fill="#0b0618" />
          </g>
        </g>
        {mood === 'win' ? (
          <path d="M84 120c10 8 22 8 32 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : mood === 'caught' ? (
          <ellipse cx="100" cy="124" rx="7" ry="8" fill="#fff" />
        ) : (
          <path d="M88 122h24" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        )}
        <path d="M60 160h80" stroke="#7f1d1d" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" />
      </g>
      {mood !== 'caught' && (
        <text className="mascot-q" x="160" y="44" fontSize="40" fontWeight="800" fill="#fde047" fontFamily="inherit">?</text>
      )}
    </svg>
  )
}

/** Desenho de "agente" para quem sabe a palavra. */
export function CrewMascot({ size = 120 }) {
  return (
    <svg className="mascot crew" width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="crew" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="186" rx="52" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <rect x="40" y="30" width="120" height="150" rx="60" fill="url(#crew)" />
        <rect x="58" y="62" width="84" height="50" rx="25" fill="#0f172a" />
        <circle cx="84" cy="87" r="8" fill="#fff" />
        <circle cx="116" cy="87" r="8" fill="#fff" />
        <path d="M82 134c10 10 26 10 36 0" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
