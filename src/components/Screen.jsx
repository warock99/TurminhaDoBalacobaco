import { IconButton } from './Button.jsx'

/** Moldura de cada tela: cabeçalho opcional, conteúdo rolável e rodapé fixo. */
export default function Screen({ title, subtitle, onBack, backIcon = 'back', right, footer, children, className = '' }) {
  return (
    <div className={`screen ${className}`}>
      {(title || onBack || right) && (
        <header className="screen-header">
          <div className="screen-header-side">
            {onBack && <IconButton icon={backIcon} label="Voltar" onClick={onBack} />}
          </div>
          <div className="screen-header-title">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="screen-header-side right">{right}</div>
        </header>
      )}
      <main className="screen-body">{children}</main>
      {footer && <footer className="screen-footer">{footer}</footer>}
    </div>
  )
}
