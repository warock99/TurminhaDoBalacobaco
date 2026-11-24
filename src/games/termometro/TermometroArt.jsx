/** Mascote do Termômetro: um termômetro sorridente com o "mercúrio" subindo e descendo. */
export function ThermoMascot({ size = 160, mood = 'normal', className = '' }) {
  return (
    <svg className={`mascot thermo thermo-${mood} ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="thermo-liquid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <clipPath id="thermo-tube">
          <rect x="84" y="26" width="32" height="120" rx="16" />
        </clipPath>
      </defs>
      <ellipse cx="100" cy="190" rx="44" ry="6" fill="rgba(0,0,0,.3)" />
      <g className="mascot-body">
        <rect x="74" y="16" width="52" height="140" rx="26" fill="#f8fafc" />
        <circle cx="100" cy="152" r="34" fill="#f8fafc" />
        <g clipPath="url(#thermo-tube)">
          <rect x="84" y="26" width="32" height="120" fill="#e2e8f0" />
          <rect className="thermo-level" x="84" y="26" width="32" height="140" fill="url(#thermo-liquid)" />
        </g>
        <circle cx="100" cy="152" r="24" fill="#38bdf8" />
        {[46, 66, 86, 106, 126].map((y) => (
          <path key={y} d={`M126 ${y}h12`} stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        ))}
        <circle cx="92" cy="148" r="4" fill="#0f172a" />
        <circle cx="108" cy="148" r="4" fill="#0f172a" />
        {mood === 'sad' ? (
          <path d="M92 164c5-5 11-5 16 0" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M91 158c5 6 13 6 18 0" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}
        <circle cx="84" cy="158" r="4" fill="#f472b6" opacity=".7" />
        <circle cx="116" cy="158" r="4" fill="#f472b6" opacity=".7" />
      </g>
    </svg>
  )
}

/** Barra de escala de 1 a max com um marcador opcional. */
export function ScaleBar({ min, max, value, maxNumber = 100 }) {
  const pct = value == null ? null : ((value - 1) / Math.max(1, maxNumber - 1)) * 100
  return (
    <div className="scale">
      <div className="scale-track">
        {pct != null && <span className="scale-marker" style={{ left: `${pct}%` }} />}
      </div>
      <div className="scale-labels">
        <span><b>1</b> {min}</span>
        <span>{max} <b>{maxNumber}</b></span>
      </div>
    </div>
  )
}
