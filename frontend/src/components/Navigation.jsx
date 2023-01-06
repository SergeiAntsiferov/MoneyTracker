import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Navigation panel
function Navigation(props) {
  const { buttons } = props;

  const location = useLocation();

  return (
    <nav className="nav">
      {buttons.map((button) => {
        const { link, title } = button;
        const isCurrentRoute = location.pathname === link;
        return (
          <Link to={link} className={isCurrentRoute ? 'nav__button nav__button_active' : 'nav__button'} key={title}>
            {title}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
