/** Fundo animado com bolhas de cor e confetes, todo em CSS. */
export default function Background({ tone = 'party' }) {
  return (
    <div className={`bg bg-${tone}`} aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="confetti c1" />
      <span className="confetti c2" />
      <span className="confetti c3" />
      <span className="confetti c4" />
      <span className="confetti c5" />
    </div>
  )
}
