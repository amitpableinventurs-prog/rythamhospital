import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  icon,
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
        {icon && <span className="btn-icon">{icon}</span>}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {icon && <span className="btn-icon">{icon}</span>}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  )
}

export default Button