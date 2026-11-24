// Personagens da turma, desenhados em SVG e animados com CSS.
// Cada personagem tem corpo inteiro (área de desenho de -20 a 170 na vertical) e um recorte só da cabeça (headBox) para os avatares.
// Para criar um novo: copie um bloco de CHARACTERS, troque id, nome, cores e o desenho em `draw`.

const OUTLINE = '#1a1033'

function Eyes({ cx = 60, y = 52, gap = 11, r = 5.5 }) {
  return (
    <g className="ch-eyes" style={{ transformOrigin: `${cx}px ${y}px` }}>
      <ellipse cx={cx - gap} cy={y} rx={r} ry={r + 1} fill="#fff" />
      <ellipse cx={cx + gap} cy={y} rx={r} ry={r + 1} fill="#fff" />
      <circle cx={cx - gap + 1} cy={y + 0.5} r={r * 0.55} fill={OUTLINE} />
      <circle cx={cx + gap + 1} cy={y + 0.5} r={r * 0.55} fill={OUTLINE} />
      <circle cx={cx - gap + 2} cy={y - 1} r={r * 0.2} fill="#fff" />
      <circle cx={cx + gap + 2} cy={y - 1} r={r * 0.2} fill="#fff" />
    </g>
  )
}

function Smile({ cx = 60, y = 66, w = 9, color = OUTLINE }) {
  return <path d={`M${cx - w} ${y}q${w} ${w * 0.8} ${w * 2} 0`} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
}

function Legs({ skin, pants, shoes = '#1f2937', top = 128, x1 = 48, x2 = 72, h = 26, w = 12 }) {
  return (
    <g>
      <rect x={x1 - w / 2} y={top} width={w} height={h} rx={w / 2} fill={pants} />
      <rect x={x2 - w / 2} y={top} width={w} height={h} rx={w / 2} fill={pants} />
      <ellipse cx={x1 - 1} cy={top + h + 2} rx={w * 0.75} ry={5} fill={shoes} />
      <ellipse cx={x2 + 1} cy={top + h + 2} rx={w * 0.75} ry={5} fill={shoes} />
      {skin && null}
    </g>
  )
}

export const CHARACTERS = [
  {
    id: 'testuda',
    name: 'Testuda',
    color: '#f9a8d4',
    headBox: '6 -20 108 108',
    draw: () => {
      const skin = '#f6c7a4'
      const hair = '#6b3f2a'
      return (
        <>
          <Legs pants="#7c3aed" shoes="#4c1d95" top={130} h={24} />
          {/* vestido */}
          <path d="M40 96h40l10 40H30z" fill="#ec4899" />
          <path d="M44 96h32v10H44z" fill="#f472b6" />
          <g className="ch-arm-l"><rect x="27" y="98" width="11" height="30" rx="5.5" fill={skin} /></g>
          <g className="ch-arm-r"><rect x="82" y="98" width="11" height="30" rx="5.5" fill={skin} /></g>
          <rect x="54" y="84" width="12" height="14" fill={skin} />
          {/* coque atrás */}
          {/* rabo de cavalo atrás */}
          <path className="ch-bun" d="M88 40c14 6 16 26 8 40-2-14-6-24-12-30z" fill={hair} />
          {/* cabeça com testa ENORME */}
          <path d="M60 -14c-30 0-36 26-36 50v28c0 14 14 24 36 24s36-10 36-24V36c0-24-6-50-36-50z" fill={skin} />
          {/* cabelo puxado para trás, bem lá no alto e nas laterais */}
          <path d="M24 64c-3-26 0-58 18-74-12 14-14 40-12 74z" fill={hair} />
          <path d="M96 64c3-26 0-58-18-74 12 14 14 40 12 74z" fill={hair} />
          <path d="M44 -10c10-6 22-6 32 0-10-2-22-2-32 0z" fill={hair} />
          {/* brilho e marquinhas da testa */}
          <ellipse className="ch-shine" cx="48" cy="10" rx="12" ry="7" fill="#fff" opacity=".6" />
          <path d="M44 28q16-5 32 0M48 36q12-4 24 0" stroke="#e8a98a" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
          <Eyes y={62} gap={10} r={5} />
          <circle cx="44" cy="72" r="4" fill="#fb7185" opacity=".45" />
          <circle cx="76" cy="72" r="4" fill="#fb7185" opacity=".45" />
          <Smile y={74} w={6} />
        </>
      )
    },
  },
  {
    id: 'diva',
    name: 'Diva',
    color: '#fde047',
    headBox: '12 -2 96 96',
    draw: () => {
      const skin = '#3d2116'
      const shade = '#2a150d'
      const glow = '#6b3a24'
      return (
        <>
          <Legs pants={skin} shoes="#be185d" top={132} h={22} w={10} />
          {/* vestido amarelo */}
          <path d="M42 96h36l12 40H30z" fill="#facc15" />
          <path d="M42 96h36v8H42z" fill="#fde047" />
          <g className="ch-arm-l"><rect x="28" y="98" width="11" height="30" rx="5.5" fill={skin} /></g>
          <g className="ch-arm-r"><rect x="81" y="98" width="11" height="30" rx="5.5" fill={skin} /></g>
          <rect x="54" y="82" width="12" height="16" fill={shade} />
          {/* black power */}
          <g className="ch-afro">
            <circle cx="60" cy="40" r="38" fill="#120a07" />
            <circle cx="30" cy="22" r="14" fill="#120a07" />
            <circle cx="90" cy="22" r="14" fill="#120a07" />
            <circle cx="46" cy="12" r="12" fill="#1d120c" />
            <circle cx="74" cy="12" r="12" fill="#1d120c" />
          </g>
          {/* rosto */}
          <ellipse cx="60" cy="56" rx="26" ry="29" fill={skin} />
          <ellipse cx="50" cy="42" rx="9" ry="5" fill={glow} opacity=".7" />
          <path d="M36 40c6-10 16-14 24-14s18 4 24 14c-8-4-16-6-24-6s-16 2-24 6z" fill="#120a07" />
          {/* argolas */}
          <circle className="ch-earring" cx="33" cy="66" r="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <circle className="ch-earring" cx="87" cy="66" r="6" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <Eyes y={54} gap={10} r={5} />
          <path d="M44 47l8-2M76 47l-8-2" stroke="#120a07" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 68q8 8 16 0q-8 3-16 0z" fill="#e11d48" />
          <path d="M52 68q8 5 16 0" stroke="#9f1239" strokeWidth="1.5" fill="none" />
          <circle cx="44" cy="64" r="3.5" fill="#e879f9" opacity=".35" />
          <circle cx="76" cy="64" r="3.5" fill="#e879f9" opacity=".35" />
        </>
      )
    },
  },
  {
    id: 'sargento',
    name: 'Sargento',
    color: '#86efac',
    headBox: '24 2 72 72',
    draw: () => {
      const skin = '#e3a77c'
      const camo = '#4d5b2a'
      return (
        <>
          {/* pernas de lado (3/4) */}
          <rect x="46" y="128" width="13" height="26" rx="6" fill={camo} />
          <rect x="62" y="128" width="13" height="26" rx="6" fill={camo} />
          <ellipse cx="50" cy="156" rx="10" ry="5" fill="#1f2937" />
          <ellipse cx="66" cy="156" rx="10" ry="5" fill="#1f2937" />
          {/* o bumbum avantajado, empinado para trás */}
          <g className="ch-butt">
            <circle cx="88" cy="120" r="22" fill="#5d6b34" />
            <circle cx="74" cy="124" r="18" fill={camo} />
            <path d="M84 102c8 5 12 12 12 20" stroke="#3a4520" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="94" cy="112" rx="5" ry="3" fill="#7a8a45" opacity=".8" />
            <path d="M112 110l7-4M114 120h8M112 130l7 4" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" className="ch-boing" />
          </g>
          <rect x="42" y="112" width="36" height="22" rx="8" fill={camo} />
          <circle cx="52" cy="118" r="3" fill="#36421a" />
          <circle cx="66" cy="126" r="4" fill="#6b7a3a" />
          {/* tronco forte com regata */}
          <path d="M30 80c0-6 8-10 30-10s30 4 30 10l-8 36H38z" fill="#65a30d" />
          <path d="M46 72q14 10 28 0" stroke="#4d7c0f" strokeWidth="3" fill="none" />
          <path d="M50 92q10 4 20 0" stroke="#4d7c0f" strokeWidth="2" fill="none" />
          {/* braços enormes */}
          <g className="ch-flex-l">
            <ellipse cx="24" cy="92" rx="13" ry="17" fill={skin} />
            <ellipse cx="22" cy="114" rx="9" ry="12" fill={skin} />
            <path d="M18 86q6-6 12 0" stroke="#c98b62" strokeWidth="2" fill="none" />
          </g>
          <g className="ch-flex-r">
            <ellipse cx="100" cy="80" rx="17" ry="12" fill={skin} />
            <ellipse cx="112" cy="60" rx="9" ry="14" fill={skin} />
            <circle cx="112" cy="46" r="7" fill={skin} />
            <path d="M94 72q8-8 14 0" stroke="#c98b62" strokeWidth="2" fill="none" />
          </g>
          <rect x="50" y="60" width="20" height="14" fill={skin} />
          {/* cabeça com queixo quadrado */}
          <path d="M36 34c0-16 10-26 24-26s24 10 24 26v16c0 12-10 20-24 20S36 62 36 50z" fill={skin} />
          {/* cabelo raspado estilo militar */}
          <path d="M36 32c0-16 10-24 24-24s24 8 24 24c-6-6-14-8-24-8s-18 2-24 8z" fill="#3f3f46" />
          <g fill="#27272a">
            {[42, 48, 54, 60, 66, 72, 78].map((x) => <circle key={x} cx={x} cy={18 + Math.abs(60 - x) / 5} r="0.9" />)}
          </g>
          <path d="M44 38h10M66 38h10" stroke="#3f3f46" strokeWidth="3.5" strokeLinecap="round" />
          <Eyes y={45} gap={10} r={4.5} />
          <path d="M52 60h16" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <path d="M66 58l3 3" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )
    },
  },
  {
    id: 'quadrado',
    name: 'Quadradão',
    color: '#93c5fd',
    headBox: '12 8 96 96',
    draw: () => {
      const skin = '#f0bf86'
      return (
        <>
          {/* baixinho: pernas curtas */}
          <Legs pants="#1e3a8a" shoes="#111827" top={140} h={14} x1={46} x2={74} w={14} />
          {/* corpo largo e forte */}
          <rect x="30" y="98" width="60" height="46" rx="14" fill="#ef4444" />
          <path d="M48 98q12 8 24 0" stroke="#b91c1c" strokeWidth="3" fill="none" />
          <path d="M60 112v20M46 118h28" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          <g className="ch-flex-l">
            <ellipse cx="24" cy="112" rx="11" ry="14" fill={skin} />
            <circle cx="22" cy="130" r="7" fill={skin} />
          </g>
          <g className="ch-flex-r">
            <ellipse cx="96" cy="112" rx="11" ry="14" fill={skin} />
            <circle cx="98" cy="130" r="7" fill={skin} />
          </g>
          {/* cabeça bem quadrada */}
          <g className="ch-square">
            <rect x="22" y="14" width="76" height="76" rx="6" fill={skin} />
            <rect x="22" y="14" width="76" height="16" rx="4" fill="#1c1917" />
            <path d="M22 26h76" stroke="#292524" strokeWidth="2" />
            <rect x="16" y="46" width="8" height="16" rx="3" fill={skin} />
            <rect x="96" y="46" width="8" height="16" rx="3" fill={skin} />
            <path d="M30 32l4 4M90 32l-4 4M30 86l4-4M90 86l-4-4" stroke="#d99f63" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 42h14M66 42h14" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
            <Eyes y={52} gap={13} r={5.5} />
            <rect x="56" y="58" width="8" height="10" rx="2" fill="#d99f63" />
            <rect x="46" y="74" width="28" height="7" rx="2" fill={OUTLINE} />
            <rect x="49" y="74" width="22" height="3" fill="#fff" />
          </g>
        </>
      )
    },
  },
  {
    id: 'cavanhaque',
    name: 'Cavanhaque',
    color: '#5eead4',
    headBox: '16 8 88 88',
    draw: () => {
      const skin = '#8a5530'
      const hair = '#1c120c'
      return (
        <>
          <Legs pants="#334155" shoes="#0f172a" top={130} h={24} />
          {/* rabo de cavalo balançando atrás */}
          <g className="ch-ponytail">
            <path d="M82 28c22 2 30 30 24 62-2 10-10 14-12 6 6-22 2-46-14-58z" fill={hair} />
            <path d="M92 40c8 10 10 26 6 44" stroke="#3b2a1f" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="84" y="28" width="10" height="7" rx="2" fill="#f59e0b" transform="rotate(35 89 31)" />
          </g>
          <path d="M36 98c0-4 8-6 24-6s24 2 24 6l4 36H32z" fill="#0d9488" />
          <path d="M52 94l8 10 8-10" stroke="#0f766e" strokeWidth="3" fill="none" strokeLinejoin="round" />
          <g className="ch-arm-l"><rect x="24" y="98" width="12" height="32" rx="6" fill={skin} /></g>
          <g className="ch-arm-r"><rect x="84" y="98" width="12" height="32" rx="6" fill={skin} /></g>
          <rect x="53" y="80" width="14" height="14" fill="#74451f" />
          {/* cabeça */}
          <ellipse cx="60" cy="52" rx="27" ry="31" fill={skin} />
          <ellipse cx="50" cy="40" rx="8" ry="4" fill="#a86a3c" opacity=".7" />
          {/* cabelo grande puxado para trás */}
          <path d="M32 46c0-24 12-34 28-34s28 10 28 32c-4-10-14-16-28-16s-24 8-28 18z" fill={hair} />
          <path d="M33 50c-3-6-3-14 1-20" stroke={hair} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M87 50c3-6 3-14-1-20" stroke={hair} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M42 41l10-2M78 41l-10-2" stroke={hair} strokeWidth="3.5" strokeLinecap="round" />
          <Eyes y={50} gap={11} r={5} />
          {/* bigode e cavanhaque */}
          <path d="M48 66q12-6 24 0q-12-2-24 0z" fill={hair} />
          <path d="M50 66c-2-3 8-5 10-3c2-2 12 0 10 3c-4 2-6 1-10 0c-4 1-6 2-10 0z" fill={hair} />
          <path d="M54 72q6 3 12 0" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path className="ch-goatee" d="M52 76c2 8 5 12 8 12s6-4 8-12c-4 2-12 2-16 0z" fill={hair} />
        </>
      )
    },
  },
]

export const CHARACTER_BY_ID = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]))

/** Desenho de um personagem. crop="head" mostra só a cabeça (para avatares). */
export function CharacterArt({ id, size = 120, crop = 'full', animated = true, className = '' }) {
  const ch = CHARACTER_BY_ID[id]
  if (!ch) return null
  const viewBox = crop === 'head' ? ch.headBox : '-4 -20 128 190'
  const height = crop === 'head' ? size : (size * 190) / 128
  return (
    <svg
      className={`character ch-${ch.id} ${animated ? 'animated' : ''} ${className}`}
      width={size}
      height={height}
      viewBox={viewBox}
      aria-hidden="true"
    >
      {crop === 'full' && <ellipse cx="60" cy="160" rx="34" ry="5" fill="rgba(0,0,0,.3)" />}
      <g className="ch-body">{ch.draw()}</g>
    </svg>
  )
}
