import Icon from './Icon.jsx'
import { vibrate } from '../lib/feedback.js'

/**
 * Botão padrão do app.
 * variant: primary | secondary | ghost | danger
 */
export default function Button({
  children,
  variant = 'primary',
  icon,
  iconRight,
  block = false,
  size = 'md',
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`}
      onClick={(e) => {
        vibrate(10)
        onClick?.(e)
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 24 : 20} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 24 : 20} />}
    </button>
  )
}

export function IconButton({ icon, label, onClick, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`icon-btn ${className}`}
      aria-label={label}
      title={label}
      onClick={(e) => {
        vibrate(8)
        onClick?.(e)
      }}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  )
}
