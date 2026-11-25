/** Mascote do Eu Duvido!: uma prancheta com lista e uma sobrancelha levantada, desconfiada. */
export function DoubtMascot({ size = 160, mood = 'normal', className = '' }) {
  return (
    <svg className={`mascot mascot-${mood} doubt ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="188" rx="50" ry="7" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <rect x="42" y="24" width="116" height="156" rx="16" fill="#0e7490" />
        <rect x="52" y="38" width="96" height="134" rx="8" fill="#ecfeff" />
        <rect x="76" y="16" width="48" height="20" rx="8" fill="#94a3b8" />
        <g className="doubt-lines">
          <path d="M64 120h12M84 120h48M64 138h12M84 138h40M64 156h12M84 156h44" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
        </g>
        {/* rosto */}
        <g className="mascot-eyes">
          <ellipse cx="80" cy="76" rx="9" ry="10" fill="#fff" stroke="#164e63" strokeWidth="2" />
          <ellipse cx="120" cy="76" rx="9" ry="10" fill="#fff" stroke="#164e63" strokeWidth="2" />
          <circle cx="82" cy="78" r="4.5" fill="#1a1033" />
          <circle cx="122" cy="78" r="4.5" fill="#1a1033" />
        </g>
        <path className="doubt-brow" d="M108 56l24-8" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 62h20" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" />
        {mood === 'win' ? (
          <path d="M84 96c10 9 22 9 32 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M86 100q10-6 28 0" stroke="#1a1033" strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
      </g>
      <text className="mascot-q" x="160" y="44" fontSize="40" fontWeight="800" fill="#fde047" fontFamily="inherit">!?</text>
    </svg>
  )
}
