/** Mascote do Quem Mentiu?: um balão de fala desconfiado, com olhar de lado e gota de suor. */
export function LiarMascot({ size = 160, mood = 'normal', className = '' }) {
  const caught = mood === 'caught'
  return (
    <svg className={`mascot mascot-${mood} liar ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="liar-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <ellipse className="mascot-shadow" cx="100" cy="188" rx="50" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <path
          d="M100 26c-46 0-78 28-78 64s32 64 78 64c8 0 15-1 22-3l26 22c4 3 9 0 8-5l-6-28c18-12 28-30 28-50 0-36-32-64-78-64z"
          fill="url(#liar-bubble)"
        />
        <path d="M54 54c10-10 24-16 40-17" stroke="#fff" strokeOpacity=".45" strokeWidth="6" strokeLinecap="round" fill="none" />
        <g className="mascot-eyes">
          <ellipse cx="78" cy="86" rx="13" ry={caught ? 15 : 11} fill="#fff" />
          <ellipse cx="122" cy="86" rx="13" ry={caught ? 15 : 11} fill="#fff" />
          <g className="mascot-pupils">
            <circle cx={caught ? 78 : 84} cy="88" r="5.5" fill="#1a1033" />
            <circle cx={caught ? 122 : 128} cy="88" r="5.5" fill="#1a1033" />
          </g>
          {!caught && (
            <>
              <path d="M64 70l26 6" stroke="#1a1033" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M136 70l-26 6" stroke="#1a1033" strokeWidth="4.5" strokeLinecap="round" />
            </>
          )}
        </g>
        {mood === 'win' ? (
          <path d="M80 112c12 12 28 12 40 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        ) : caught ? (
          <ellipse cx="100" cy="118" rx="8" ry="10" fill="#1a1033" />
        ) : (
          <path d="M84 116q8-6 16 0t16 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
        <path className="liar-drop" d="M156 52c0 0-8 10-8 16a8 8 0 0016 0c0-6-8-16-8-16z" fill="#bae6fd" />
      </g>
    </svg>
  )
}
