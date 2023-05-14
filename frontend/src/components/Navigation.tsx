import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { StringObject } from '../types'

type NavigationProps = {
  buttons: StringObject[]
}

// Navigation panel
function Navigation (props: NavigationProps) {
  const { buttons } = props
  const location = useLocation()

  return (
    <nav className="nav">
      {buttons.map(({ link, title }: StringObject) => {
        const isCurrentRoute = location.pathname === link
        return (
          <Link to={link} className={isCurrentRoute ? 'nav__button nav__button_active' : 'nav__button'} key={title}>
            {title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
